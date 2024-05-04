from flask import Flask, redirect, render_template, request, url_for,jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_mysqldb import MySQL
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = True
app.config['JWT_SECRET_KEY'] = os.getenv('jwt_key')
jwt = JWTManager(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = os.getenv('dbpwd')
app.config['MYSQL_DB'] = 'HOTEL'

mysql = MySQL(app)

@app.route('/')
def index():
    return jsonify({"res":"Nothing here"})

@app.route('/login', methods=['POST'])
def login():
    data=request.get_json()
    if not data:
        return jsonify({'message': 'Authentication is required!'}), 401
    try:
        cursor = mysql.connection.cursor()
        # Execute query
        cursor.callproc("login",(data["username"],data["password"]))
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    if len(res)==1:
        access_token = create_access_token(identity=res[0][0])
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password!'}), 200
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    print(current_user )
    return jsonify(logged_in_as=current_user), 200
@app.errorhandler(NoAuthorizationError)
def handlerror(ex):
    return jsonify({'MSG':"NOT AUTHENTICATED"}),401
#home
@app.route('/home', methods=['GET'])
def home():
    try:
        cursor = mysql.connection.cursor()
        # Execute query
        cursor.callproc("cities")
        cities = cursor.fetchall()
        cursor.close()
        cursor = mysql.connection.cursor()
        cursor.callproc("propertys")
        propertys = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})

    return jsonify({'cities':cities,'properties':propertys})

#get all hotels in a city
@app.route('/city', methods=['POST'])
def city():
    data=request.json
    if not data:
        return jsonify({'message': 'city not provided'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call city_fetch('%s')"%data["city"])
        hotels = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'properties':hotels})

#get all rooms in a hotel
@app.route('/hotel', methods=['POST'])
def rooms():
    data=request.json
    if not data:
        return jsonify({'message': 'Hotel not provided'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call hotel_fetch(%s)"%data["hotel_id"])
        rooms = cursor.fetchall()
        cursor.close()
        cursor = mysql.connection.cursor()
        cursor.execute("call fetch_review(%s)"%data["hotel_id"])
        reviews = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'info':rooms,"reviews":reviews})

#books a room after verifying jwt token
@app.route('/book', methods=['POST'])
@jwt_required()
def book_room():
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call book_room(%s,%s,%s,%s,%s,%s,%s)",(data["pid"],data["uid"],data["r_cat"],data["checkin"],data["checkout"],data["g_count"],data["amount"]))
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'RID':res})
    
@app.errorhandler(NoAuthorizationError)
def handlerror(ex):
    return jsonify({'MSG':"NOT AUTHENTICATED"})

#cancel a booking after verifying jwt token
@app.route('/cancellation', methods=['POST'])
@jwt_required()
def cancel_book():
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call cancel_book(%s)"%data["bid"])
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':res})

@app.route('/signup/user', methods=['POST'])
def usr_signup():
    data=request.json
    if not data:
        return jsonify({'message': 'Invalid data!'}), 401
    try:
        err="non"
        cursor = mysql.connection.cursor()
        # Execute query
        cursor.execute("call new_user('%s','%s','%s','%s','%s',@err)"%(data["username"],data["password"],data["name"],data["email"],data["addr"]))
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
        cursor = mysql.connection.cursor()
        cursor.execute("select @err")
        res = cursor.fetchall()
        cursor.close()
        return jsonify({"result":res})
    except Exception as e:
        return jsonify({'error': str(e)})

#Account signup for manager
@app.route('/signup/mngr', methods=['POST'])
def mngr_signup():
    data=request.json
    if not data:
        return jsonify({'message': 'Invalid data!'}), 401
    try:
        err="non"
        cursor = mysql.connection.cursor()
        # Execute query
        cursor.execute("call mngr_signup('%s','%s','%d','%s',@err)"%(data["username"],data["password"],data["pid"],data["email"]))
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
        cursor = mysql.connection.cursor()
        cursor.execute("select @err")
        res = cursor.fetchall()
        cursor.close()
        return jsonify({"result":res})
    except Exception as e:
        return jsonify({'error': str(e)})
    return "manager added"

#Account signin for manager
@app.route('/login/mngr', methods=['POST'])
def mngr_login():
    data=request.get_json()
    if not data:
        return jsonify({'message': 'Authentication is required!'}), 401
    try:
        cursor = mysql.connection.cursor()
        # Execute query
        cursor.callproc("mngr_login",(data["username"],data["password"]))
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    if len(res)==1:
        access_token = create_access_token(identity=res[0][0])
        print("Manager for ",res[0][0]," logged in")
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password!'}), 200

#update room count details for Manager
@app.route('/mngr/roomUpdate', methods=['POST'])
@jwt_required()
def updateCount():
    current_user = get_jwt_identity()
    print(current_user)
    try:
        cursor = mysql.connection.cursor()
        cursor.callproc("get_pid")
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    if current_user not in res[0] or current_user != int(data["pid"]):
        return jsonify({"msg":"You are not The manager for this hotel"})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call room_count_update(%s,%s,%s)",(data["pid"],data["cat"],data["num"]))
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':"Room count has been updated to "+(data["num"])})

#update room count details for Manager
@app.route('/mngr/priceUpdate', methods=['POST'])
@jwt_required()
def updatePrice():
    current_user = get_jwt_identity()
    print(current_user)
    try:
        cursor = mysql.connection.cursor()
        cursor.callproc("get_pid")
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    if current_user not in res[0] or current_user != int(data["pid"]):
        return jsonify({"msg":"You are not The manager for this hotel"})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call room_price_update(%s,%s,%s)",(data["pid"],data["cat"],data["price"]))
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':"Room Price has been updated for RT"+data["cat"]+" Catagory Rooms to "+data["price"]})

#Fetch Records for Manager
@app.route('/mngr/fetchRec', methods=['POST'])
@jwt_required()
def fetchRec():
    current_user = get_jwt_identity()
    print(current_user)
    try:
        cursor = mysql.connection.cursor()
        cursor.callproc("get_pid")
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    if current_user not in res[0] or current_user != int(data["pid"]):
        return jsonify({"msg":"You are not The manager for this hotel"})
    try:
        cursor = mysql.connection.cursor()
        cursor.callproc("fetch_rec",(data["pid"],))
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':res})

if __name__ == '__main__':

    app.run()
