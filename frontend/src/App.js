import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobleContext from './contextApi/GlobleContex';
import Loader from './Components/Loader';

// Pages
import Home from './page/Home';
import About from './page/About';
import CategoryPage from './page/CategoryPage';
import Register from './page/Register';
import Login from './page/Login';
import ManagerRegister from './page/ManagerRegister';
import ManagerLogin from './page/ManagerLogin';
import ErrorPage from './page/ErrorPage';
import SingleHotelView from './page/SingleHotelView';
import Profile from './page/Profile';
import PaymentPage from './page/PaymentPage';

// Manager Pages
import HomeMan from './Manager/HomeMan';
import Dashboard from './Manager/Dashboard';
import Rooms from './Manager/Rooms';
import Booking from './Manager/Booking';

// Components
import Header from './Components/Header';
import HeaderUser from './Components/HeaderUser';
import HeaderManager from './Components/HeaderManager';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';

// RedirectIfLoggedIn Component
const RedirectIfLoggedIn = ({ element }) => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserType = localStorage.getItem('UserType');
        if (storedUserType) {
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error('Failed to fetch user type:', error);
      }
    };

    fetchData();
  }, []);

  return userType ? <Navigate to="/" /> : element;
};

function App() {
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserType = localStorage.getItem('UserType');
        if (storedUserType) {
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error('Failed to fetch user type:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <GlobleContext>
      <BrowserRouter>
        {/* Conditionally render Header based on userType */}
        {userType === 'user' && <HeaderUser />}
        {userType === 'manager' && <HeaderManager />}
        {userType !== 'user' && userType !== 'manager' && <Header />}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/SingleHotelView/:id" element={<SingleHotelView />} />
          <Route path="/Login" element={<RedirectIfLoggedIn element={<Login />} />} />
          <Route path="/Register" element={<RedirectIfLoggedIn element={<Register />} />} />
          <Route path="/ManagerRegister" element={<RedirectIfLoggedIn element={<ManagerRegister />}/>} />
          <Route path="/ManagerLogin" element={<RedirectIfLoggedIn element={<ManagerLogin />}/>} />
          <Route path="/ErrorPage" element={<ErrorPage />} />

          {/* Protected Routes for Users */}
          <Route path="/CategoryPage" element={<ProtectedRoute element={<CategoryPage />} allowedUserTypes={['user']} userType={userType} />} />
          <Route path="/Profile" element={<ProtectedRoute element={<Profile />} allowedUserTypes={['user']} userType={userType} />} />
          <Route path="/PaymentPage" element={<ProtectedRoute element={<PaymentPage />} allowedUserTypes={['user']} userType={userType} />} />

          {/* Protected Routes for Managers */}
          <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} allowedUserTypes={['manager']} userType={userType} />} />
          <Route path="/Rooms" element={<ProtectedRoute element={<Rooms />} allowedUserTypes={['manager']} userType={userType} />} />
          <Route path="/HomeMan" element={<ProtectedRoute element={<HomeMan />} allowedUserTypes={['manager']} userType={userType} />} />
          <Route path="/Booking" element={<ProtectedRoute element={<Booking />} allowedUserTypes={['manager']} userType={userType} />} />

          {/* Catch-all Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </GlobleContext>
  );
}

export default App;
