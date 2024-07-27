import React, { useState, useEffect } from 'react';
import { HotelRoomDetail } from '../Detail/HotelDetail';
import {
  Container,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const user = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   username: 'johndoe123',
//   addr: '123 Main Street, Cityville',
// };

const Profile = () => {
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const[user,setUser] = useState([]);

  

  useEffect(() => {
    fetchUid();
  }, []); // Fetch UID on initial render

  const fetchUid = () => {
    const apiUrl = 'http://localhost:5000/protected';
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      console.error('Access token not found in localStorage');
      setError('Access token not found');
      showLoginExpiredPopup(); // Show login expired popup
      return;
    }

    axios.get(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('User ID retrieved:', response.data.logged_in_as);
        setUid(response.data.logged_in_as);
        getUserData(response.data.logged_in_as); 
        getBookingData(response.data.logged_in_as);
        
    })
    .catch(error => {
        console.error('Error fetching user ID:', error);
        setError('Failed to fetch user ID');
        showLoginExpiredPopup(); // Show login expired popup
    });
  };

  const getBookingData = (uid) => {
    const apiUrl = 'http://localhost:5000/bookings';
    const accessToken = localStorage.getItem('token');

    axios.post(apiUrl, { uid }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('POST request successful:', response.data);

      // Assuming response.data.result is the array of bookings data
      const newBookings = convertResponseToBookings(response.data.result);
      setBookings(newBookings);

      // Store the bookings data in local storage
      localStorage.setItem('bookingData', JSON.stringify(response.data.result));  
      
    })
    .catch(error => {
      console.error('Error making POST request:', error);
      showLoginExpiredPopup();
      // Handle error if needed
    });
  };

  const getUserData = (uid) => {
    const apiUrl = 'http://localhost:5000/userInfo';
    const accessToken = localStorage.getItem('token');

    axios.post(apiUrl, { uid }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('POST request successful:');
      setUser(response.data.res[0]);



      localStorage.setItem('userData', JSON.stringify(response.data.res));  
      
    })
    .catch(error => {
      console.error('Error making POST request:', error);
      showLoginExpiredPopup();
      // Handle error if needed
    });
  };

  const convertResponseToBookings = (responseData) => {
    return responseData.map(item => ({
      id: item[0],
      hotelName: `${(HotelRoomDetail.find(room => room.pid === item[1])).name}`, // Adjust as per your requirement
      city: `${(HotelRoomDetail.find(room => room.pid === item[1])).city}`,
      bookingDate: new Date(item[4]).toISOString().split('T')[0],
      checkInDate: new Date(item[5]).toISOString().split('T')[0], // Format to YYYY-MM-DD
      checkOutDate: new Date(item[6]).toISOString().split('T')[0], // Format to YYYY-MM-DD
      guestCount: item[7], // Assuming guest count is at index 7
      amount: `$${item[8]}`, // Assuming amount is at index 8
      status: item[9] === 1 ? 'Cancelled' : 'Confirmed', // Assuming status is at index 9 (0 or 1)
      // Example details
    }));
  };

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
  };

  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const checkDate = new Date(dateString);
    return currentDate > checkDate; // Compare if current date is greater than check-in date
  };

  const upcomingBookings = bookings.filter((booking) => !isDatePassed(booking.checkInDate));
  const previousBookings = bookings.filter((booking) => isDatePassed(booking.checkInDate));

  const handleBookingClick = (id) => {
    if (expandedBookingId === id) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(id);
    }
  };

  const handleCancelBooking = (bookingId) => {
    setCancelBookingId(bookingId);
  };

  const confirmCancelBooking = () => {
    console.log(`Cancel booking with ID ${cancelBookingId}`);
  const apiUrl = 'http://localhost:5000/cancellation';
  const accessToken = localStorage.getItem('token');

  axios.post(apiUrl, { bid: cancelBookingId }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('Cancellation request successful:', response.data);
    // Optionally update state or perform other actions upon successful cancellation
    // For example, update bookings state to reflect the cancellation
    // Reload or update bookings from server
    window.location.reload();// Reload bookings after cancellation
  })
  .catch(error => {
    console.error('Error making cancellation request:', error);
    showLoginExpiredPopup();
    // Handle cancellation request error if needed
  });

  setCancelBookingId(null); // Close the dialog

  };

  const handleCloseCancelDialog = () => {
    setCancelBookingId(null);
  };


  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} className="profile-container">
          <Typography variant="h4" gutterBottom>
            Welcome, {user[1]}!
          </Typography>
          <div className="profile-info">
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user[4]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Username:</strong> {user[3]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {user[5]}
            </Typography>
          </div>

          <div className="booking-section">
            <Typography variant="h5" gutterBottom>
              Upcoming Bookings
            </Typography>
            <div className="booking-history">
              {upcomingBookings.map((booking) => (
                <div key={booking.id}
                  className={`booking-card ${expandedBookingId === booking.id ? 'expanded' : ''}`}
                  onClick={() => handleBookingClick(booking.id)}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Hotel Name:</strong> {booking.hotelName} <strong>-</strong> {booking.city}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Booking Date:</strong> {booking.bookingDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Check-in:</strong> {booking.checkInDate} - <strong>Check-out:</strong> {booking.checkOutDate}
                  </Typography>
                  {expandedBookingId === booking.id && (
                    <div className="booking-details">
                      <Typography variant="body1" gutterBottom>
                        <strong>Guest Count:</strong> {booking.guestCount}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Amount:</strong> {booking.amount}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Status:</strong> {booking.status}
                      </Typography>
                      <Typography variant="body1">
                        {booking.details}
                      </Typography>
                      {booking.status === 'Confirmed' && (
                      <Button variant="contained"color="error"onClick={() => handleCancelBooking(booking.id)}>
                        Cancel Booking
                      </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Typography variant="h5" gutterBottom>
              Previous Bookings
            </Typography>
            <div className="booking-history">
              {previousBookings.map((booking) => (
                <div key={booking.id}
                  className={`booking-card ${expandedBookingId === booking.id ? 'expanded' : ''}`}
                  onClick={() => handleBookingClick(booking.id)}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Hotel Name:</strong> {booking.hotelName} <strong>-</strong> {booking.city}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Booking Date:</strong> {booking.bookingDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Check-in:</strong> {booking.checkInDate} - <strong>Check-out:</strong> {booking.checkOutDate}
                  </Typography>
                  {expandedBookingId === booking.id && (
                    <div className="booking-details">
                      <Typography variant="body1" gutterBottom>
                        <strong>Guest Count:</strong> {booking.guestCount}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Amount:</strong> {booking.amount}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Status:</strong> {booking.status}
                      </Typography>
                      <Typography variant="body1">
                        {booking.details}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Paper>

        <Dialog open={cancelBookingId !== null} onClose={handleCloseCancelDialog}>
          <DialogTitle>Confirm Cancellation</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to cancel this booking?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancelDialog} color="primary">
              No
            </Button>
            <Button onClick={confirmCancelBooking} color="error" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Profile;
