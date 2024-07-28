const APP_USER_STORAGE = 'HOTEL-USER-STORAGE';
const APP_ACCESS_TOKEN = 'HOTEL-ACCESS-TOKEN';

export const getSessionUser = () => {
    const userStr = localStorage.getItem('UserType');
  
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  export const getSessionToken = () => {
    const tokenStr = localStorage.getItem('token');
  
    if (tokenStr) {
      return tokenStr;
    }
    return null;
  };
