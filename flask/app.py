from flask import Flask, redirect, render_template, request, url_for,jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime
import requests
import json
import threading
import schedule,time

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = True
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
jwt = JWTManager(app)

app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Styl@123'
app.config['MYSQL_DB'] = 'HOTEL'

mysql = MySQL(app)

#sheduler
def reset_bookings():
    try:
        response = requests.post('http://localhost:5000/reset',headers={'content-type': 'application/json'})
        response.raise_for_status()  # Raise an error for bad responses
        print(f"Request successful: {response.status_code}")
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

def schedule_task():
    """Function to schedule the task."""
    schedule.every().day.at("07:39").do(reset_bookings)

    while True:
        schedule.run_pending()
        time.sleep(1)  # Sleep for a short period to avoid high CPU usage

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
        cursor.execute("call book_room(%s,%s,%s,%s,%s,%s,%s,%s)",(data["pid"],data["uid"],data["r_cat"],datetime.today().strftime('%Y-%m-%d'),data["checkin"],data["checkout"],data["g_count"],data["amount"]))
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

#Account signup for user
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
        
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({"result":res})

#Fetch userinfo
@app.route('/userInfo', methods=['POST'])
@jwt_required()
def usr_info():
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call fetch_usr(%s)"%data["uid"])
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'res':res})

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
    try:
        cursor = mysql.connection.cursor()
        cursor.callproc("fetch_rec",(data["pid"],))
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':res})

#get booking records of a user
@app.route('/bookings', methods=['POST'])
@jwt_required()
def recFetch():
    data=request.json
    if not data:
        return jsonify({'message': 'data is missing'})
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call get_bookings(%s)"%data["uid"])
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':res})

#prediction stuff
@app.route("/predict",methods=["POST"])
@jwt_required()
def predict():
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
        cursor.callproc("ml_data",(data["rid"],))
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    tmp=[]
    for i in res:
        tmp.append([i[0].strftime('%Y-%m-%d'),i[1].strftime('%Y-%m-%d'),i[2].strftime('%Y-%m-%d'),i[3],i[4],i[5],i[6]])
    dictToSend={"info":tmp}
    rlt = requests.post('http://ml:8000/predict', json=dictToSend,headers={'content-type': 'application/json'})
    print(rlt.json())

    return jsonify({'result':"High" if rlt.json()['data'][0]=='1' else "Low"})

#RESET BOOKINGS
@app.route("/reset",methods=["POST"])
def reset():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call reset()")
        res = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    return jsonify({'result':res})

@app.route("/retrain",methods=["POST"])
def retrain():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("call ml_fetch()")
        res = cursor.fetchall()
        cursor.close()
    except Exception as e:
        return jsonify({'error': str(e)})
    tmp=[]
    for i in res:
        tmp.append([i[0].strftime('%Y-%m-%d'),i[1].strftime('%Y-%m-%d'),i[2].strftime('%Y-%m-%d'),i[3],i[4],i[5],i[6]])
    dictToSend={"info":tmp}
    rlt = requests.post('http://ml:8000/reset', json=dictToSend,headers={'content-type': 'application/json'})
    print(rlt.json())
    return jsonify({'result':rlt.json()})

if __name__ == '__main__':
    scheduler_thread = threading.Thread(target=schedule_task)
    scheduler_thread.start()
    app.run()

