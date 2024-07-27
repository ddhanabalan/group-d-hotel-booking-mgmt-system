import React, { useState } from 'react';
import HeaderUser from '../Components/HeaderUser';
import { Container, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import MUI components
import './Profile.css'; // Import CSS file for additional styling

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe123',
  addr: '123 Main Street, Cityville',
};

const bookings = [
  {
    id: 1,
    hotelName: 'Example Hotel 1',
    checkInDate: '2024-07-22',
    checkOutDate: '2024-07-25',
    guestCount: 2,
    amount: '$500',
    status: 'Confirmed',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat congue tortor, sit amet maximus lacus consectetur vel.',
  },
  {
    id: 2,
    hotelName: 'Example Hotel 2',
    checkInDate: '2024-08-05',
    checkOutDate: '2024-08-08',
    guestCount: 1,
    amount: '$300',
    status: 'Pending',
    details: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In vitae sapien sed elit cursus scelerisque.',
  },
  {
    id: 3,
    hotelName: 'Example Hotel 3',
    checkInDate: '2023-07-10',
    checkOutDate: '2023-07-15',
    guestCount: 3,
    amount: '$700',
    status: 'Confirmed',
    details: 'Integer sollicitudin purus eu elit commodo, ut fermentum quam aliquet. Morbi convallis ante at nisi hendrerit ultricies.',
  },
  // Add more bookings as needed
];

const Profile = () => {
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const handleBookingClick = (id) => {
    if (expandedBookingId === id) {
      setExpandedBookingId(null); // Collapse if already expanded
    } else {
      setExpandedBookingId(id); // Expand if not expanded
    }
  };

  // Function to check if a date has passed
  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const checkDate = new Date(dateString);
    return checkDate < currentDate;
  };

  // Separate bookings into upcoming and previous based on check-in date
  const upcomingBookings = bookings.filter((booking) => !isDatePassed(booking.checkInDate));
  const previousBookings = bookings.filter((booking) => isDatePassed(booking.checkInDate));

  // Function to handle cancel booking
  const handleCancelBooking = (bookingId) => {
    setCancelBookingId(bookingId); // Set the booking ID to prompt for cancellation confirmation
  };

  // Function to confirm cancellation
  const confirmCancelBooking = () => {
    // Logic to cancel the booking goes here
    console.log(`Cancel booking with ID ${cancelBookingId}`);
    // You can implement your cancellation logic here, e.g., making an API call

    setCancelBookingId(null); // Reset cancelBookingId after cancellation
  };

  // Function to close cancel confirmation dialog
  const handleCloseCancelDialog = () => {
    setCancelBookingId(null); // Reset cancelBookingId on dialog close
  };

  return (
    <div>

      <Container maxWidth="sm"> {/* Center the content */}
        <Paper elevation={3} className="profile-container">
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name}!
          </Typography>
          {/* Profile information */}
          <div className="profile-info">
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {user.addr}
            </Typography>
            {/* Other user details */}
          </div>

          {/* Hotel bookings section */}
          <div className="booking-section">
            <Typography variant="h5" gutterBottom>
              Upcoming Bookings
            </Typography>
            <div className="booking-history">
              {/* Display upcoming booking history */}
              {upcomingBookings.map((booking) => (
                <div key={booking.id}
                  className={`booking-card ${expandedBookingId === booking.id ? 'expanded' : ''}`}
                  onClick={() => handleBookingClick(booking.id)}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Hotel Name:</strong> {booking.hotelName}
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Typography variant="h5" gutterBottom>
              Previous Bookings
            </Typography>
            <div className="booking-history">
              {/* Display previous booking history */}
              {previousBookings.map((booking) => (
                <div key={booking.id}
                  className={`booking-card ${expandedBookingId === booking.id ? 'expanded' : ''}`}
                  onClick={() => handleBookingClick(booking.id)}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Hotel Name:</strong> {booking.hotelName}
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

        {/* Dialog for cancellation confirmation */}
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
