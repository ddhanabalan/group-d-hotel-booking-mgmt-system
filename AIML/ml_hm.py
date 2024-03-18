#!/usr/bin/env python
# coding: utf-8

# <h2>Importing Libraries</h2>

# In[1]:


import pandas as pd
import seaborn as sns
import numpy as np
import calendar
import scipy.stats as stats
import matplotlib.pyplot as plt
import datetime
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder


# <h2>Read Dataset</h2>

# In[2]:


data_set=pd.read_pickle("fact_bookings.pickle")
property_set=pd.read_pickle("dim_hotels.pickle")
data_set.head()


# In[3]:


property_set.head()


# <h2>Dataset Basic Information</h2>

# In[4]:


data_set=pd.merge(data_set,property_set,on='property_id',how='left')


# In[5]:


data_set.info()


# In[6]:


data_set.shape


# <h2>Statistics Information</h2>

# In[7]:


data_set.describe().T


# In[8]:


data_set.describe(include="object").T


# In[9]:


data_set.isnull().sum()


# In[10]:


data_set.fillna(0,inplace=True)


# <h2>Removal of Duplicates and Dropping of Unwanted Data</h2>

# In[11]:


data_set.duplicated().sum()


# In[12]:


#Removal Of Unwanted Data
data_set=data_set.drop(columns=['booking_id','revenue_realized'])


# <h2>Explanatory Data Analysis and Preprocessing</h2>

# In[13]:


data_set.columns


# <h2>Values in Categorical values</h2>

# In[14]:


data_set=data_set.assign(
        no_days_book_to_checkin=None,no_days_checkin_checkout=None,
        rev_person=None,booking_month=None,check_month=None,
        no_weekend=None,is_cancelled=None)


# In[15]:


#Finding the number of days from booking_date and check_in_date
def no_of_days_between(from_date,to_date,weekend):
    booking_checkin=[]
    for c in range (len(data_set)):
        holiday=0
        f_date=datetime.datetime.strptime(data_set[from_date][c], '%Y-%m-%d').date()
        t_date=datetime.datetime.strptime(data_set[to_date][c], '%Y-%m-%d').date()
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


# In[16]:


categorical_data=['property_id','no_guests','room_category',
        'booking_status','property_name','category',
        'city','booking_month','check_month']


# In[17]:


for i in categorical_data:
    data_set[i]=data_set[i].astype("object")


# <h3> Feature Engineering </h3>
# <h5> New Feature: rev_person is the revenue_generated per no_guests </h6>
# <h5> New Feature: no_days_book_to_checkin is the number of the days between booking date and check in date </h6>
# <h5> New Feature: no_days_checkin_checkout is the number of the days between check in date and checkout date </h6>
# <h5> New Feature: book_month is the month of the booking date </h6>
# <h5> New Feature: check_month is the month of check in and checkout date </h6>

# In[18]:


no_week=[]
data_set["no_days_book_to_checkin"]=no_of_days_between('booking_date','check_in_date',weekend=False)
data_set["no_days_checkin_checkout"]=no_of_days_between('check_in_date','checkout_date',weekend=True)
data_set["no_weekend"]=no_week
data_set["booking_month"]=data_set['booking_date'].apply(lambda x:x.split("-")[1])
data_set["check_month"]=(data_set['check_in_date'].apply(lambda x:x.split("-")[1]).astype(int)
        + data_set['checkout_date'].apply(lambda x:x.split("-")[1]).astype(int)) / 2


# In[19]:


for column in categorical_data:
    print(data_set[column].value_counts().sort_values(ascending=False))
    print('\n')


# <h1> Outlier Detection and Removal</h1>

# In[20]:


sns.boxplot(data_set['revenue_generated'])


# In[21]:


sns.boxplot(data_set['no_days_book_to_checkin'])


# In[22]:


def iqr_method(outlier):
    #Removing Outliers using IQR Method
    q1=data_set[outlier].quantile(0.25)
    q3=data_set[outlier].quantile(0.75)
    iqr=q3-q1
    upper_limit = q3 + (1.5*iqr)
    lower_limit = q1 - (1.5*iqr)
    #capping
    data_set.loc[(data_set[outlier]>upper_limit),outlier]=upper_limit
    data_set.loc[(data_set[outlier]<lower_limit),outlier]=lower_limit


# In[23]:


iqr_method('revenue_generated')
iqr_method('no_days_book_to_checkin')


# In[24]:


sns.boxplot(data_set['no_days_book_to_checkin'])


# In[25]:


sns.boxplot(data_set['revenue_generated'])


# In[26]:


data_set["rev_person"]=data_set["revenue_generated"]/data_set["no_guests"]


# In[27]:


data_set["is_cancelled"]=data_set["booking_status"].map({'Checked Out':0,'No Show':1,'Cancelled':1})


# In[28]:


plt.figure(figsize=(12,4))
sns.barplot(data=data_set, x="room_category",y="rev_person",hue="property_name")
plt.show()


# In[29]:


#Removal of Data which is done after feature generation
data_set=data_set.drop(columns=['booking_date','check_in_date','checkout_date'],axis=0)


# <h5> Behaviour of booking_status based on input variables </h5>
# <h5> Out of 134590 reservation, Checked Out - 94411, Cancelled -  33420 , No Show - 6579</h5>
# <h5> The output variable is considered on the basis of room cancellation,</h5> 
# <h5> So a new columns has been created 'is_cancelled' which considers Cancelled and No Show as 1 while the Checked Out as 0  </h5>
# <h5> Out of the seven hotels, Atliq Season charges more for their rooms compared to others. </h5>
# <h5> Most reservation are booked for two guests and the room category (RT2) </h5>
# <h5> Most of the reservation are reserved through other means </h5>
# <h5> Luxury type hotels are reserved more than the Business ones </h5>
# <h5> Most people reserve their rooms for one day and book them within three days before the check-in date </h5>

# In[30]:


for column in data_set.columns:
    if (column!='revenue_generated' and column!='rev_person'):
        plt.figure(figsize=(16,8))
        sns.countplot(data_set,x=column,hue='booking_status')
        plt.show() 


# In[31]:


data_set.booking_status.value_counts().plot(kind='pie',autopct='%1.0f%%')


# In[32]:


data_set.is_cancelled.value_counts().plot(kind='pie',autopct='%1.0f%%')


# In[33]:


sns.catplot(y= 'revenue_generated', x = 'booking_status', data = data_set, kind = 'violin')


# <h1>Encoding Categorical Data</h1>

# In[34]:


data_set["category"]=data_set["category"].map({'Luxury':1,'Business':0})


# In[35]:


label_encoder = LabelEncoder()
for feature in data_set.columns:
    if data_set[feature].dtypes == 'object' and feature!='property_id':
        data_set[feature]=label_encoder.fit_transform(data_set[feature])


# In[36]:


data_set["city"].unique()


# <h1>Feature Selection</h1>

# In[37]:


#Feature Selection - Dropping constant features (Constant Features which aren't relevant to the output is removed)
data_set=data_set.drop(columns='booking_status')
#data_set=pd.get_dummies(data_set,columns=["room_category","booking_platform","city",'property_name'])
data_set_X=data_set.drop(columns='is_cancelled')
data_set_Y=data_set['is_cancelled']


# In[38]:


corelation = data_set.corr()
plt.figure(figsize=(16,10))
sns.heatmap(corelation, xticklabels=corelation.columns, yticklabels=corelation.columns,annot=True)


# In[39]:


def correlation(dataset,threshold):
    col_corr=set()
    corr_matrix=dataset.corr()
    for i in range(len(corr_matrix.columns)):
        for j in range(i):
            if abs(corr_matrix.iloc[i,j])>=threshold:
                colname=corr_matrix.columns[i]
                col_corr.add(colname)
    return col_corr


# In[40]:


corr_features=correlation(data_set_X,0.6)
data_set_X=data_set_X.drop(corr_features,axis=1)
corr_features


# <h3> Splitting the Dataset into Train and Test Dataset</h1>

# In[41]:


scaler=StandardScaler()
data_set_X=scaler.fit_transform(data_set_X)


# In[42]:


from sklearn.model_selection import train_test_split
train_X,test_X,train_Y,test_Y=train_test_split(data_set_X,data_set_Y,train_size=0.7,random_state=1)


# <h3> Choosing the Model for Classification Model </h1>

# In[43]:


from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.metrics import classification_report,confusion_matrix,ConfusionMatrixDisplay,roc_curve,roc_auc_score
dtc=DecisionTreeClassifier(random_state=0)


# In[44]:


def model_analyze(model):
    model.fit(train_X,train_Y)
    pred_Y = model.predict(test_X)
    pred_train_Y = model.predict(train_X)
    print("\n--------------------Training Set--------------------\n")
    print(classification_report(train_Y,pred_train_Y))
    print("\n----------------------Test Set----------------------\n")
    print(classification_report(test_Y, pred_Y))
    ConfusionMatrixDisplay.from_estimator(model,test_X,test_Y,colorbar=True)
    plt.title(" Confusion Matrix")
    plt.show()
    model_train_auc = roc_auc_score(train_Y, pred_train_Y)
    print('AUC: %.3f' % model_train_auc)
    model_train_fpr, model_train_tpr, model_train_thresholds = roc_curve(train_Y, pred_train_Y)
    plt.plot([0, 1], [0, 1], linestyle='--')
    plt.plot(model_train_fpr, model_train_tpr)
    plt.title(" ROC Curve for Train Data ")
    plt.show()
    model_train_auc = roc_auc_score(test_Y, pred_Y)
    print('AUC: %.3f' % model_train_auc)
    model_train_fpr, model_train_tpr, model_train_thresholds = roc_curve(test_Y, pred_Y)
    plt.plot([0, 1], [0, 1], linestyle='--')
    plt.plot(model_train_fpr, model_train_tpr)
    plt.title(" ROC Curve for Test Data ")


# In[45]:


model_analyze(dtc)


# In[46]:


from sklearn.ensemble import AdaBoostClassifier
ada=AdaBoostClassifier(estimator=dtc)
model_analyze(ada)


# from sklearn.model_selection import RandomizedSearchCV
# n_estimators = [int(x) for x in np.linspace(start=200, stop=2000, num=10)]
# max_features=['auto','sqrt','log2']
# max_depth=[int(x) for x in np.linspace(200,1000,10)]

# In[47]:


from sklearn.ensemble import RandomForestClassifier
rdc=RandomForestClassifier(random_state=0, n_jobs=-1)
model_analyze(rdc)


# In[48]:


#kNN Nearest Neighbour
from sklearn.neighbors import KNeighborsClassifier
knn_model = KNeighborsClassifier(n_neighbors=5)
model_analyze(knn_model)


# In[49]:


from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier()
model_analyze(gb)


# In[50]:


#Gaussian Nearest Neighbour
from sklearn.linear_model import LogisticRegression
nb_model = LogisticRegression()
model_analyze(nb_model)


# In[51]:


#Gaussian Nearest Neighbour
from sklearn.naive_bayes import GaussianNB
nb_model = GaussianNB()
model_analyze(nb_model)

