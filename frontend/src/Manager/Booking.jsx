import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Booking.css';
import CancellationPrediction from './Cancellation';
import Loader from '../Components/Loader';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const getRoomCategoryName = (categoryNumber) => {
  switch (categoryNumber) {
    case 1: return 'Standard';
    case 2: return 'Deluxe';
    case 3: return 'Executive';
    case 4: return 'Presidential';
    default: return 'Unknown';
  }
};

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState('sno');
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const pid = localStorage.getItem('pid');

      const response = await axios.post('http://localhost:5000/mngr/fetchRec', { pid }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const bookingsData = response.data.result.map(booking => ({
        id: booking[0],
        userId: booking[2],
        roomCategory: getRoomCategoryName(booking[3]),
        bookingDate: formatDate(booking[4]),
        checkInDate: formatDate(booking[5]),
        checkOutDate: formatDate(booking[6]),
        guestCount: booking[7],
        price: parseFloat(booking[8]),
        status: booking[9] === 1 ? 'Cancelled' : 'Confirmed'
      }));

      setBookings(bookingsData);
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the bookings!', error);
      showLoginExpiredPopup();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSort = (column) => {
    const newSortDirection = (sortColumn === column && sortDirection === 'asc') ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newSortDirection);

    const sortedBookings = [...bookings].sort((a, b) => {
      if (a[column] < b[column]) return newSortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setBookings(sortedBookings);
  };

  const showLoginExpiredPopup = () => {
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx auto p-4">
      <Button
        component={Link}
        to="/HomeMan"
        variant="outlined"
        color="primary"
        style={{ marginBottom: '20px' }}
      >
        Back
      </Button>
      <h1 className="bookings-header">Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('sno')} className={`bookings-th ${sortColumn === 'sno' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Sno
            </th>
            <th onClick={() => handleSort('id')} className={`bookings-th ${sortColumn === 'id' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Booking ID
            </th>
            <th onClick={() => handleSort('userId')} className={`bookings-th ${sortColumn === 'userId' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              User ID
            </th>
            <th onClick={() => handleSort('roomCategory')} className={`bookings-th ${sortColumn === 'roomCategory' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Category
            </th>
            <th onClick={() => handleSort('bookingDate')} className={`bookings-th ${sortColumn === 'bookingDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Booking Date
            </th>
            <th onClick={() => handleSort('checkInDate')} className={`bookings-th ${sortColumn === 'checkInDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Check-in Date
            </th>
            <th onClick={() => handleSort('checkOutDate')} className={`bookings-th ${sortColumn === 'checkOutDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Check-out Date
            </th>
            <th onClick={() => handleSort('guestCount')} className={`bookings-th ${sortColumn === 'guestCount' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Guest Count
            </th>
            <th onClick={() => handleSort('price')} className={`bookings-th ${sortColumn === 'price' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Price
            </th>
            <th onClick={() => handleSort('status')} className={`bookings-th ${sortColumn === 'status' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}>
              Status
            </th>
            <th className="bookings-th">Cancellation Prediction</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="bookings-tr">
              <td className="bookings-td">{index + 1}</td>
              <td className="bookings-td">{booking.id}</td>
              <td className="bookings-td">{booking.userId}</td>
              <td className="bookings-td">{booking.roomCategory}</td>
              <td className="bookings-td">{booking.bookingDate}</td>
              <td className="bookings-td">{booking.checkInDate}</td>
              <td className="bookings-td">{booking.checkOutDate}</td>
              <td className="bookings-td">{booking.guestCount}</td>
              <td className="bookings-td">{booking.price}</td>
              <td className="bookings-td">{booking.status}</td>
              <td className="bookings-td">
                <CancellationPrediction bookingId={booking.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
