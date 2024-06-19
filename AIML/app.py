import pandas as pd;
from sklearn import preprocessing;
import datetime;
import joblib;
import ast;
from flask import Flask,jsonify,request

app = Flask(__name__)

vals=[[None,None,None,None,None,None,None,None,None,None,None,None,None]]
encoder = joblib.load('encoder.obj')
scaler = joblib.load('scaler.obj')
model = joblib.load('model.pkl') 
#ds=pd.DataFrame(vals,columns=["booking_day","check_out_day","no_days_book_to_checkin","room_catagory","check_in_day","no_guests","no_days_checkin_checkout","booking_month","no_weekend","category_Business"])
def no_of_days_between(from_date,to_date,no_week,weekend,dataRaw):
    booking_checkin=[]
    for c in range (len(dataRaw)):
        holiday=0
        f_date=datetime.datetime.strptime(dataRaw[from_date][c], '%Y-%m-%d').date()
        t_date=datetime.datetime.strptime(dataRaw[to_date][c], '%Y-%m-%d').date()
        no_days=t_date-f_date
        booking_checkin.append(no_days.days)
        delta=datetime.timedelta(days=1)
        if weekend==True:
            while (f_date<=t_date):
                f_date+=delta
                if(f_date.weekday()>=5):
                    holiday+=1
            no_week.append(holiday)
    return(booking_checkin)


fromServer=[]
@app.route('/predict', methods=['POST'])
def mngr_login():
    data=request.get_json()
    if not data:
        return jsonify({'message': 'Authentication is required!'}),
    print(data)
    ds=pd.DataFrame(vals,columns=["no_guests","room_catagory",'property_name','category','city',"no_days_book_to_checkin","no_days_checkin_checkout","booking_month","check_month","no_weekend","booking_day","check_in_day","check_out_day"])
    dR=pd.DataFrame([data["info"]],columns=['booking_date','check_in_date','checkout_date','no_guests','room_catagory','property_name','city'])

    no_week=[]
    ds["no_days_book_to_checkin"]=no_of_days_between('booking_date','check_in_date',no_week,weekend=False,dataRaw=dR)
    ds["no_days_checkin_checkout"]=no_of_days_between('check_in_date','checkout_date',no_week,weekend=True,dataRaw=dR)
    ds["no_weekend"]=no_week
    ds["booking_day"]=dR['booking_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["check_in_day"]=dR['check_in_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["check_out_day"]=dR['checkout_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["booking_month"]=dR['booking_date'].apply(lambda x:x.split("-")[1]).astype(int)
    ds["check_month"]=(dR['check_in_date'].apply(lambda x:x.split("-")[1]).astype(int)+dR['checkout_date'].apply(lambda x:x.split("-")[1]).astype(int))/2
    ds["no_guests"]=dR["no_guests"]
    ds["room_catagory"]=dR["room_catagory"]
    ds["property_name"]=dR["property_name"]
    ds["city"]=dR["city"]

    encoded_data = encoder.transform(ds)
    f = open("selected_features.txt", "r")
    str_list = f.read()
    sel_columns = ast.literal_eval(str_list)
    rearranged_data = encoded_data.loc[:,sel_columns]
    scaled_data = scaler.transform(rearranged_data) 

    print("hey")
    predicted_Y=model.predict(scaled_data)
    print(predicted_Y)
    return jsonify({"data":str(predicted_Y[0])})