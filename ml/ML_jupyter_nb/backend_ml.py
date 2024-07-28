import pandas as pd
import seaborn as sns
import numpy as np
import pickle
import optuna
import matplotlib.pyplot as plt
import datetime
from sklearn import preprocessing
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.feature_selection import chi2, SelectKBest
from sklearn.tree import DecisionTreeClassifier
import category_encoders as ce
from sklearn.metrics import accuracy_score,f1_score
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import joblib
import ast
from flask import Flask,jsonify,request
from sklearn.utils import class_weight
from sklearn.model_selection import cross_val_score, KFold
from sklearn.metrics import classification_report,confusion_matrix,ConfusionMatrixDisplay,roc_curve,roc_auc_score,mean_absolute_error


app = Flask(__name__)
encoder = joblib.load('encoder.obj') # location of the encoder
scaler = joblib.load('scaler.obj') # location of the scaler
model = joblib.load('model.pkl') # location of the model
#ds=pd.DataFrame(vals,columns=["booking_day","check_out_day","no_days_book_to_checkin","room_catagory","check_in_day","no_guests","no_days_checkin_checkout","booking_month","no_weekend","category"])
hotel_category=[['Atliq Grands','Delhi','Luxury'],['Atliq Exotica','Delhi','Luxury'],['Atliq City','Delhi','Business'],['Atliq Blu','Delhi','Luxury'],['Atliq Bay','Delhi','Luxury'],['Atliq Palace','Delhi','Business'],['Atliq Grands','Mumbai','Luxury'],['Atliq Exotica','Mumbai','Luxury'],['Atliq City','Mumbai','Business'],['Atliq Blu','Mumbai','Luxury'],['Atliq Bay','Mumbai','Luxury'],['Atliq Palace','Mumbai','Business'],['Atliq Grands','Hyderabad','Luxury'],['Atliq Exotica','Hyderabad','Luxury'],['Atliq City','Hyderabad','Business'],['Atliq Blu','Hyderabad','Luxury'],['Atliq Bay','Hyderabad','Luxury'],['Atliq Palace','Hyderabad','Business'],['Atliq Grands','Bangalore','Luxury'],['Atliq Exotica','Bangalore','Luxury'],['Atliq City','Bangalore','Business'],['Atliq Blu','Bangalore','Luxury'],['Atliq Bay','Bangalore','Luxury'],['Atliq Palace','Bangalore','Business'],['Atliq Seasons','Mumbai','Business']]

fromServer=[]
@app.route('/predict', methods=['POST'])
def mngr_login():
    data=request.get_json()
    if not data:
        return jsonify({'message': 'Authentication is required!'}),
    print(data)
    #data=[['2024-05-22', '2024-06-04', '2024-06-06', 4, 'RT3', 'Atliq City', 'Delhi']]
    ds=pd.DataFrame(columns=["no_guests","room_category",'property_name','category','city',"no_days_book_to_checkin","no_days_checkin_checkout","booking_month","check_month","no_weekend","booking_day","check_in_day","check_out_day"])
    dR=pd.DataFrame(data["info"],columns=['booking_date','check_in_date','checkout_date','no_guests','room_category','property_name','city'])

    pred_no_week=[]
    print(dR)
    
    ds["no_days_book_to_checkin"]=no_of_days_between(ds,dR,'booking_date','check_in_date',pred_no_week,weekend=False)
    ds["no_days_checkin_checkout"]=no_of_days_between(ds,dR,'check_in_date','checkout_date',pred_no_week,weekend=True)
    ds["no_weekend"]=pred_no_week
    ds["booking_day"]=dR['booking_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["check_in_day"]=dR['check_in_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["check_out_day"]=dR['checkout_date'].apply(lambda x:x.split("-")[2]).astype(int)
    ds["booking_month"]=dR['booking_date'].apply(lambda x:x.split("-")[1]).astype(int)
    ds["check_month"]=(dR['check_in_date'].apply(lambda x:x.split("-")[1]).astype(int)+dR['checkout_date'].apply(lambda x:x.split("-")[1]).astype(int))/2
    ds["no_guests"]=dR["no_guests"].astype(int)
    ds["room_category"]=dR["room_category"]
    ds["property_name"]=dR["property_name"]
    ds["city"]=dR["city"]
    print(ds)

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

def no_of_days_between(ds,dR,from_date,to_date,no_week,weekend):
    booking_checkin=[]
    for c in range (len(dR)):
        holiday=0
        f_date=datetime.datetime.strptime(dR[from_date][c], '%Y-%m-%d').date()
        t_date=datetime.datetime.strptime(dR[to_date][c], '%Y-%m-%d').date()
        no_days=t_date-f_date
        booking_checkin.append(no_days.days)
        delta=datetime.timedelta(days=1)
        if weekend==True:
            for i in range(len(hotel_category)):
                if (hotel_category[i][0]==dR["property_name"][c]) and (hotel_category[i][1]==dR["city"][c]):
                    ds.loc[c,"category"]=hotel_category[i][2]
            while (f_date<=t_date):
                f_date+=delta
                if(f_date.weekday()>=5):
                    holiday+=1
            no_week.append(holiday)
    return(booking_checkin)


def rfc_objective(trial):
    # Suggest values for hyperparameters
    n_estimators = trial.suggest_int("n_estimators", 10, 200, log=True)
    max_depth = trial.suggest_int("max_depth", 2, 32)
    min_samples_split = trial.suggest_int("min_samples_split", 2, 10)
    min_samples_leaf = trial.suggest_int("min_samples_leaf", 1, 10)

    # Create and fit random forest model
    model = RandomForestClassifier(
    n_estimators=n_estimators,
    max_depth=max_depth,
    min_samples_split=min_samples_split,
    min_samples_leaf=min_samples_leaf,
    random_state=42,
    )

    model.fit(train_X,train_Y)
    pred_Y = model.predict(test_X)
    kf = KFold(n_splits=5, random_state=None)
    result = cross_val_score(model, val_X, val_Y, cv=kf, scoring='f1')
    print(result.mean())
    mae = mean_absolute_error(test_Y, pred_Y)
    # Return MAE
    return mae

def knn_objective(trial):
    n_neighbors = trial.suggest_int("n_neighbors", 1, 30)
    weights = trial.suggest_categorical("weights", ['uniform', 'distance'])
    metric = trial.suggest_categorical("metric", ['euclidean', 'manhattan', 'minkowski'])
    model = KNeighborsClassifier(n_neighbors=n_neighbors, weights=weights, metric=metric)
    model.fit(train_X,train_Y)
    pred_Y = model.predict(test_X)
    kf = KFold(n_splits=5, random_state=None)
    result = cross_val_score(model, val_X, val_Y, cv=kf, scoring='accuracy')
    print(result.mean())
    mae = mean_absolute_error(test_Y, pred_Y)
    # Return MAE
    return mae

def log_objective(trial):
    tol= trial.suggest_float('tol' , 1e-6 , 1e-3)
    C = trial.suggest_float("C", 1e-2, 1)
    fit_intercept = trial.suggest_categorical('fit_intercept' , [True, False])
    random_state = trial.suggest_categorical('random_state' , [0, 42, 2021, 555])
    solver = trial.suggest_categorical('solver' , ['lbfgs','liblinear'])
    model = LogisticRegression(tol=tol, C=C, fit_intercept = fit_intercept, random_state=random_state, solver=solver)
    model.fit(train_X,train_Y)
    pred_Y = model.predict(test_X)
    kf = KFold(n_splits=5, random_state=None)
    result = cross_val_score(model, val_X, val_Y, cv=kf, scoring='accuracy')
    print(result.mean())
    mae = mean_absolute_error(test_Y, pred_Y)
    # Return MAE
    return mae

@app.route('/retrain', methods=['POST'])
def retrain():
    #retrain_data is the list of data required for training the model. The data should contain more than 5000 entries, inorder to make model work
    #retrain_data=['2024-05-22', '2024-06-04', '2024-06-06', 4, RT3, 'Checked Out','Atliq City', 'Delhi']['2024-05-22', '2024-06-02', '2024-06-03', 4, RT3, 'Cancelled', 'Atliq City', 'Delhi'] 
    retrain_data=request.get_json()
    if not retrain_data:
        return jsonify({'message': 'Authentication is required!'}),
    # print(retrain_data)
    data_set=pd.DataFrame(columns=["no_guests","room_category",'property_name','category','city',"no_days_book_to_checkin","no_days_checkin_checkout","booking_month","check_month","no_weekend","booking_day","check_in_day","check_out_day","booking_status"])
    data_raw=pd.DataFrame(retrain_data,columns=['booking_date', 'check_in_date', 'checkout_date', 'no_guests', 'room_category', 'booking_status', 'property_name', 'city'])
    # The columns in the data_raw should be arranged on the basis of how the data is received from the server.
    no_week=[]
    data_set["no_guests"]=data_raw["no_guests"].astype(int)
    data_set["room_category"]=data_raw["room_category"]
    data_set["property_name"]=data_raw["property_name"]
    data_set["city"]=data_raw["city"]
    data_set["booking_status"]=data_raw["booking_status"]
    data_set["no_days_book_to_checkin"]=no_of_days_between(data_set,data_raw,'booking_date','check_in_date',no_week,weekend=False)
    data_set["no_days_checkin_checkout"]=no_of_days_between(data_set,data_raw,'check_in_date','checkout_date',no_week,weekend=True)
    data_set["no_weekend"]=no_week
    data_set["booking_day"]=data_raw['booking_date'].apply(lambda x:x.split("-")[2]).astype(int)
    data_set["check_in_day"]=data_raw['check_in_date'].apply(lambda x:x.split("-")[2]).astype(int)
    data_set["check_out_day"]=data_raw['checkout_date'].apply(lambda x:x.split("-")[2]).astype(int)
    data_set["booking_month"]=data_raw['booking_date'].apply(lambda x:x.split("-")[1]).astype(int)
    data_set["check_month"]=(data_raw['check_in_date'].apply(lambda x:x.split("-")[1]).astype(int)+data_raw['checkout_date'].apply(lambda x:x.split("-")[1]).astype(int))/2
    data_set["booking_status"]=data_set["booking_status"].map({'Checked Out':1,'No Show':0,'Cancelled':0})

    print(data_set)
    data_set_X=data_set.drop(columns='booking_status')
    data_set_Y=data_set['booking_status']
    global train_X,train_Y,test_X,test_Y,val_X,val_Y

    train_X_raw,test_X_raw,train_Y,test_Y=train_test_split(data_set_X,data_set_Y,train_size=0.7,random_state=42,stratify=data_set_Y)
    val_X_raw,test_X_raw,val_Y,test_Y=train_test_split(test_X_raw,test_Y,train_size=0.5,random_state=42,stratify=test_Y)

    encoder = ce.OneHotEncoder()
    train_X_encoded=encoder.fit_transform(train_X_raw,train_Y)
    val_X_encoded=encoder.transform(val_X_raw)
    test_X_encoded=encoder.transform(test_X_raw)

    smote=SMOTE(random_state=0)
    train_X_SMOTE,train_Y_SMOTE=smote.fit_resample(train_X_encoded,train_Y)

    corelation = train_X_SMOTE.corr()
    plt.figure(figsize=(20,16))
    sns.heatmap(corelation, xticklabels=corelation.columns, yticklabels=corelation.columns,annot=True)

    col_corr=set()
    corr_matrix=train_X_SMOTE.corr()
    for i in range(len(corr_matrix.columns)):
        for j in range(i):
            if abs(corr_matrix.iloc[i,j])>=0.7:
                colname=corr_matrix.columns[i]
                col_corr.add(colname)

    train_X_corr=train_X_SMOTE.drop(col_corr,axis=1)
    val_X_corr=val_X_encoded.drop(col_corr,axis=1)
    test_X_corr=test_X_encoded.drop(col_corr,axis=1)
    print("Variables removed due to correlation",col_corr)
    train_acc = {}
    test_acc = {}
    train_f1 = {}
    test_f1 = {}
    acc_per_features = {}
    variable = np.arange(1,24)
    for i in variable:
        sel_five_cols=SelectKBest(chi2, k=i)
        sel_five_cols.fit(train_X_corr,train_Y_SMOTE)
        train_X_chi=train_X_corr[train_X_corr.columns[sel_five_cols.get_support()]]
        test_X_chi=test_X_corr[test_X_corr.columns[sel_five_cols.get_support()]]
        model= RandomForestClassifier()
        model.fit(train_X_chi,train_Y_SMOTE)
        pred_train_Y = model.predict(train_X_chi)
        pred_Y = model.predict(test_X_chi)
        train_acc[i-1]=accuracy_score(pred_train_Y,train_Y_SMOTE)
        test_acc[i-1]=accuracy_score(pred_Y,test_Y)
        acc_per_features[i-1]=(0.1*train_acc[i-1])+(0.9*test_acc[i-1])
        train_f1[i-1]=f1_score(pred_train_Y,train_Y_SMOTE)
        test_f1[i-1]=f1_score(pred_Y,test_Y)

    print(acc_per_features)
    acc_value=[]
    for i in variable:
        acc_value.append(acc_per_features[i-1])
    max_acc_chi=max(acc_value)
    sel_features_chi=acc_value.index(max_acc_chi)
    print("The number of features which are selected for training the model are ",sel_features_chi, "which gives an accuracy of ",max_acc_chi)

    rdc=RandomForestClassifier(random_state=0, n_jobs=-1)
    rdc.fit(train_X_corr,train_Y_SMOTE)
    feature_importances = rdc.feature_importances_
    sorted_indices = np.argsort(feature_importances)[::-1]

    train_acc = {}
    test_acc = {}
    train_f1 = {}
    test_f1 = {}
    acc_per_features = {}
    for i in range (2,len(sorted_indices)):
        train_X_rfc = train_X_corr.iloc[:, sorted_indices[0:i]]
        test_X_rfc = test_X_corr.iloc[:, sorted_indices[0:i]]
        model = RandomForestClassifier()
        model.fit(train_X_rfc,train_Y_SMOTE)
        pred_train_Y = model.predict(train_X_rfc)
        pred_Y = model.predict(test_X_rfc)
        train_acc[i-1]=accuracy_score(pred_train_Y,train_Y_SMOTE)
        test_acc[i-1]=accuracy_score(pred_Y,test_Y)
        acc_per_features[i-1]=(0.1*train_acc[i-1])+(0.9*test_acc[i-1])
        train_f1[i-1]=f1_score(pred_train_Y,train_Y_SMOTE)
        test_f1[i-1]=f1_score(pred_Y,test_Y)

    print(acc_per_features)
    acc_value=[]
    for i in range (2,len(sorted_indices)):
        acc_value.append(acc_per_features[i-1])
    max_acc_rfc=max(acc_value)
    sel_features_rfc=acc_value.index(max_acc_rfc)
    print("The number of features which are selected for training the model are ",sel_features_rfc, "which gives an accuracy of ",max_acc_rfc)

    if (max_acc_chi > max_acc_rfc):
        sel_five_cols=SelectKBest(chi2, k=sel_features_chi)
        sel_five_cols.fit(train_X_corr,train_Y_SMOTE)
        train_X_sel=train_X_corr[train_X_corr.columns[sel_five_cols.get_support()]]
        val_X_sel=val_X_corr[val_X_corr.columns[sel_five_cols.get_support()]]
        test_X_sel=test_X_corr[test_X_corr.columns[sel_five_cols.get_support()]]
        print("Number of features : ",sel_features_chi)
    else:
        train_X_sel=train_X_corr.iloc[:, sorted_indices[0:sel_features_rfc]]
        val_X_sel=val_X_corr.iloc[:, sorted_indices[0:sel_features_rfc]]
        test_X_sel=test_X_corr.iloc[:, sorted_indices[0:sel_features_rfc]]
        print("Number of features : ",sel_features_rfc)

    f = open("selected_features.txt", "w")
    f.write(str(list(train_X_sel.columns)))
    f.close()

    scaler=StandardScaler()
    train_Y=train_Y_SMOTE
    train_X=scaler.fit_transform(train_X_sel)
    val_X=scaler.transform(val_X_sel)
    test_X=scaler.transform(test_X_sel)

    acc=[]
    cv_acc=[]

    study = optuna.create_study(direction="minimize")
    study.optimize(rfc_objective, n_trials=50, show_progress_bar=True)
    print("Best trial:", study.best_trial)
    print("Best hyperparameters:", study.best_params)

    rfc=RandomForestClassifier(**study.best_params)
    rfc.fit(train_X,train_Y)
    pred_Y = rfc.predict(test_X)
    print(classification_report(test_Y, pred_Y))
    acc.append(roc_auc_score(test_Y, pred_Y))
    kf = KFold(n_splits=5, random_state=None)
    result = cross_val_score(rfc, val_X, val_Y, cv=kf)
    cv_acc.append(result.mean())

    study = optuna.create_study(direction="minimize")
    study.optimize(knn_objective, n_trials=50, show_progress_bar=True)
    print("Best trial:", study.best_trial)
    print("Best hyperparameters:", study.best_params)
    knn=KNeighborsClassifier(**study.best_params)
    knn.fit(train_X,train_Y)
    # model_analyze(knn)
    pred_Y = knn.predict(test_X)
    print(classification_report(test_Y, pred_Y))
    acc.append(roc_auc_score(test_Y, pred_Y))
    result = cross_val_score(knn, val_X, val_Y, cv=kf)
    cv_acc.append(result.mean())

    study = optuna.create_study(direction="maximize")
    study.optimize(log_objective, n_trials=50, show_progress_bar=True)
    print("Best trial:", study.best_trial)
    print("Best hyperparameters:", study.best_params)
    log=LogisticRegression(**study.best_params)
    # model_analyze(log)
    log.fit(train_X,train_Y)
    pred_Y = log.predict(test_X)
    print(classification_report(test_Y, pred_Y))
    acc.append(roc_auc_score(test_Y, pred_Y))
    result = cross_val_score(log, val_X, val_Y, cv=kf)
    cv_acc.append(result.mean())

    nb=GaussianNB()
    # model_analyze(nb)
    nb.fit(train_X,train_Y)
    pred_Y = nb.predict(test_X)
    print(classification_report(test_Y, pred_Y))
    acc.append(roc_auc_score(test_Y, pred_Y))
    result = cross_val_score(nb, val_X, val_Y, cv=kf)
    cv_acc.append(result.mean())
    print(acc)
    print(cv_acc)
    max_acc=max(acc)
    high_acc=acc.index(max_acc) 
    if high_acc==0:
        pickle.dump(rfc, open('model.pkl','wb'))
    elif high_acc==1:
        pickle.dump(knn, open('model.pkl','wb'))
    elif high_acc==2:
        pickle.dump(log, open('model.pkl','wb'))
    elif high_acc==3:
        pickle.dump(nb, open('model.pkl','wb'))
    pickle.dump(encoder, open('encoder.obj','wb'))
    pickle.dump(scaler, open('scaler.obj','wb'))
    print("Encoder, Scaler and Model are published ")
