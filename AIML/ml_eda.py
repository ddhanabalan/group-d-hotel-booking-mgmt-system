#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import seaborn as sns
import numpy as np
import calendar
import matplotlib.pyplot as plt
import datetime
from sklearn.preprocessing import StandardScaler


# In[2]:


data_set=pd.read_pickle("fact_bookings.pickle")
property_set=pd.read_pickle("dim_hotels.pickle")
data_set.head()


# In[3]:


property_set.head()


# In[4]:


data_set.columns,property_set.columns


# In[5]:


data_set.info(),property_set.info()


# In[6]:


data_set.describe()


# In[7]:


data_set.isnull().sum()


# In[8]:


data_set=pd.merge(data_set,property_set,on='property_id',how='left')


# In[9]:


data_set.booking_status.value_counts()


# In[10]:


#data_set[data_set.duplicated()].shape
data_set=data_set.drop_duplicates()
data_set.shape


# In[11]:


data_set["category"]=data_set["category"].map({'Luxury':1,'Business':0})


# In[12]:


data_set["booking_status"]=data_set["booking_status"].map({'Checked Out':1,'No Show':1,'Cancelled':0})


# In[13]:


data_set["room_category"]=data_set["room_category"].map({'RT1':1,'RT2':2,'RT3':3,'RT4':4})


# In[14]:


data_set["city"]=data_set["city"].map({'Delhi':1,'Mumbai':2,'Hyderabad':3,'Bangalore':4})


# In[15]:


data_set["booking_platform"]=data_set["booking_platform"].map({'direct online':1,'others':2,'logtrip':3,'tripster':4,'makeyourtrip':5,'journey':6,'direct offline':7})


# In[16]:


data_set["property_name"].unique()


# In[17]:


data_set["property_name"]=data_set["property_name"].map({'Atliq Grands':1,'Atliq Exotica':2,'Atliq City':3,'Atliq Blu':4,'Atliq Bay':5,'Atliq Palace':6,'Atliq Seasons':7})


# In[18]:


data_set=data_set.assign(no_days_book_to_checkin=None,no_days_checkin_checkout=None,rev_person=None,booking_month=None,check_month=None,no_weekend=None)


# In[19]:


#Removal Of Unwanted Data
data_set=data_set.drop(columns=['property_id','booking_id','ratings_given','revenue_realized'])


# In[20]:


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


# <h3> Feature Generation </h3>
# <h5> New Feature: rev_person is the revenue_generated per no_guests </h6>
# <h5> New Feature: no_days_book_to_checkin is the number of the days between booking date and check in date </h6>
# <h5> New Feature: no_days_checkin_checkout is the number of the days between check in date and checkout date </h6>
# <h5> New Feature: book_month is the month of the booking date </h6>
# <h5> New Feature: check_month is the month of check in and checkout date </h6>

# In[21]:


no_week=[]
data_set["rev_person"]=data_set["revenue_generated"]/data_set["no_guests"]
data_set["no_days_book_to_checkin"]=no_of_days_between('booking_date','check_in_date',weekend=False)
data_set["no_days_checkin_checkout"]=no_of_days_between('check_in_date','checkout_date',weekend=True)
data_set["no_weekend"]=no_week
data_set["booking_month"]=data_set['booking_date'].apply(lambda x:x.split("-")[1])
data_set["check_month"]=(data_set['check_in_date'].apply(lambda x:x.split("-")[1]).astype(int)+data_set['checkout_date'].apply(lambda x:x.split("-")[1]).astype(int))/2


# In[22]:


#Removal of Data which is done after feature generation
data_set=data_set.drop(columns=['booking_date','check_in_date','checkout_date'],axis=0)


# In[23]:


data_set.info()


# In[24]:


data_set[["booking_status","room_category","booking_platform","booking_month"]]=data_set[["booking_status","room_category","booking_platform","booking_month"]].astype(int).astype(int).astype(int).astype(int)


# In[25]:


data_set=data_set.iloc[:,[0,1,2,4,5,6,7,8,9,10,11,12,13,3]]


# In[26]:


data_set.head()


# In[27]:


for column in data_set.columns:
    if (column!='revenue_generated' and column!='rev_person'):
        sns.countplot(data_set,x=column,hue='booking_status')
        plt.show() 


# <h3> Behaviour of booking_status based on input variables </h3>
# <h5> Out of 134590 reservation, 101170 got Checked Out or No Show and  3342 got Cancelled) </h5>
# <h5> Most reservation are booked for two guests and the room category (RT2) </h5>
# <h5> Most of the reservation are reserved through other means </h5>
# <h5> Luxury type hotels are reserved more than the Business ones </h5>
# <h5> Most people reserve their rooms for one day and book them within three days before the check-in date </h5>

# <h1> Outlier Detection and Removal</h1>

# In[28]:


for column in data_set.columns:
    if (column!='booking_status'):
        sns.boxplot(y=column,x='booking_status',data=data_set)
        plt.show() 


# In[29]:


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


# In[30]:


iqr_method('rev_person')
iqr_method('revenue_generated')
iqr_method('no_guests')
iqr_method('no_days_book_to_checkin')
sns.boxplot(y='rev_person',x='booking_status',data=data_set)


# In[31]:


sns.boxplot(y='revenue_generated',x='booking_status',data=data_set)


# <h1>Feature Selection</h1>

# In[32]:


#Feature Selection - Dropping constant features (Constant Features which aren't relevant to the output is removed)
data_set_X=data_set.drop(columns='booking_status')
data_set_Y=data_set['booking_status']
from sklearn.feature_selection import VarianceThreshold
var_thres=VarianceThreshold(threshold=0)
var_thres.fit(data_set)


# In[33]:


var_thres.get_support()


# In[34]:


corelation = data_set.corr()
plt.figure(figsize=(16,10))
sns.heatmap(corelation, xticklabels=corelation.columns, yticklabels=corelation.columns,annot=True)


# In[35]:


def correlation(dataset,threshold):
    col_corr=set()
    corr_matrix=dataset.corr()
    for i in range(len(corr_matrix.columns)):
        for j in range(i):
            if abs(corr_matrix.iloc[i,j])>threshold:
                colname=corr_matrix.columns[i]
                col_corr.add(colname)
    return col_corr


# In[36]:


corr_features=correlation(data_set,0.7)
data_set_X=data_set_X.drop(corr_features,axis=1)
corr_features

