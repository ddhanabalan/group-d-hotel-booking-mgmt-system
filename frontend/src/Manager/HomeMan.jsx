import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HotelRoomDetail } from '../Detail/HotelDetail';
import './HomeMan.css';
import Loader from '../Components/Loader';


const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left', // Align text to the left
  color: theme.palette.text.primary, // Use primary text color
  backgroundColor: theme.palette.background.default, // Use default background color
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const RoomContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Adds margin-bottom to each room detail
}));

const PageContainer = styled('div')({
  margin: '20px', // Adjust as needed
  marginBottom: '50px', // Increase bottom margin
});

const HomeMan = () => {
  const navigate = useNavigate();
  const [pid, setPid] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const storedPid = localStorage.getItem('pid'); // Get pid from localStorage

    if (!pid && token && !storedPid) { // Check if pid is not set and there's no stored pid in localStorage
      axios.get('http://localhost:5000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`, // Corrected the template literal
        }
      })
      .then(response => {
        console.log('PID:', response.data);
        const receivedPid = response.data['logged_in_as'];
        setPid(receivedPid); // Set PID state
        localStorage.setItem('pid', receivedPid); // Store PID in localStorage
      })
      .catch(error => console.error('Error fetching PID:', error));
    } else {
      // If pid is already set or stored in localStorage, use it
      setPid(storedPid);
    }

    // Filtering hotel room details based on pid
    const filtered = HotelRoomDetail.filter(room => room.pid === parseInt(storedPid));
    setFilteredRooms(filtered);
    localStorage.setItem("HotelDetails",JSON.stringify(filtered));
  }, [pid]); // Add pid to the dependency array

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
    <div className="container m-auto">
      <PageContainer>
      <Typography variant="h3" gutterBottom style={{ color: 'white' }}>
        Welcome to ATLIQ
      </Typography>
        {/* Display filtered rooms */}
        {filteredRooms.map(room => (
          <RoomContainer key={room.id} item xs={12}>
            <PaperContainer>
              <Typography variant="h5">{room.name}</Typography>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>{room.city}</Typography>
              <Typography variant="body1">{room.description}</Typography>
              <Typography variant="body1">{room.category}</Typography>
              {/* Add more details as needed */}
            </PaperContainer>

          </RoomContainer>
        ))}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h5">Dashboard</Typography>
              <Typography variant="body1">
                View your hotel’s overall performance metrics.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/Dashboard"
              >
                Go to Dashboard
              </ButtonContainer>
            </PaperContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h5">Rooms</Typography>
              <Typography variant="body1">
                Manage room availability and details.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/rooms"
              >
                Manage Rooms
              </ButtonContainer>
            </PaperContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h5">Bookings</Typography>
              <Typography variant="body1">
                View and manage current bookings.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/Booking"
              >
                Manage Bookings
              </ButtonContainer>
            </PaperContainer>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
    </header>
  );
};

export default HomeMan;
