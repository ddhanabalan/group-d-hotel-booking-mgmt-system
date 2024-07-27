import React, { useState, useEffect,Link } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
    const [bookingDetails, setBookingDetails] = useState(null);
    const [selectedPropertyList, setSelectedPropertyList] = useState([]);
    const [uid, setUid] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();

    

    const getNumberOfDays = (checkInDate, checkOutDate) => {
        const checkInTime = new Date(checkInDate).getTime();
        const checkOutTime = new Date(checkOutDate).getTime();
        const difference = checkOutTime - checkInTime;
        const numberOfDays = difference / (1000 * 3600 * 24);
        return Math.floor(numberOfDays);
    };

    useEffect(() => {
        const storedBookingDetails = localStorage.getItem('bookingDetails');
        if (storedBookingDetails) {
            setBookingDetails(JSON.parse(storedBookingDetails));
        }
    
        const storedSelectedProperty = localStorage.getItem('selectedProperty');
        if (storedSelectedProperty) {
            const propertyList = storedSelectedProperty.split(',');
            setSelectedPropertyList(propertyList);
        }

        fetchUid();
    }, []);

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
        })
        .catch(error => {
            console.error('Error fetching user ID:', error);
            setError('Failed to fetch user ID');
            showLoginExpiredPopup(); // Show login expired popup
        });
    }

    const showLoginExpiredPopup = () => {
        // Optionally, you can use a state to manage this popup
        alert('Login expired. Redirecting to home page.');
        localStorage.clear();
        navigate('/');
    }

    const handleConfirmBooking = () => {
        const apiUrl = 'http://localhost:5000/book';
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            console.error('Access token not found in localStorage');
            setError('Access token not found');
            showLoginExpiredPopup(); // Show login expired popup
            return;
        }

        const numRooms = Math.ceil(bookingDetails.numGuests / 4);
        const bookingRequests = [];
        var guests = bookingDetails.numGuests;

        for (let i = 0; i < numRooms; i++) {
            if (guests >= 4){
                var tempguests = 4;
                guests = guests-4;
            }
            else{
                var tempguests = guests;
            }
            const payload = {
                pid: selectedPropertyList[0],
                uid: uid,
                r_cat: bookingDetails.roomType,
                checkin: bookingDetails.checkInDate,
                checkout: bookingDetails.checkOutDate,
                g_count: tempguests,
                amount: (selectedPropertyList[7 + bookingDetails.roomType])*getNumberOfDays(bookingDetails.checkInDate,bookingDetails.checkOutDate)
            };

            bookingRequests.push(
                axios.post(apiUrl, payload, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
            );
        }

        Promise.all(bookingRequests)
            .then(responses => {
                console.log('All bookings successful:', responses);
                setBookingStatus('All bookings successful');
                setShowConfirmationModal(true);
            })
            .catch(error => {
                console.error('Error booking:', error);
                setError('Error booking rooms');
                showLoginExpiredPopup();
            });
    }

    const handleModalClose = () => {
        setShowConfirmationModal(false);
        navigate('/');
    }

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-1">
                <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Booking Details</h2>
                            {bookingDetails ? (
                                <>
                                    <p><strong>Hotel:</strong> {selectedPropertyList[1]}</p>
                                    <p><strong>Type:</strong> {selectedPropertyList[2]}</p>
                                    <p><strong>City:</strong> {selectedPropertyList[3]}</p>
                                    <p><strong>Room Type:</strong> {bookingDetails.roomName}</p>
                                    <p><strong>Price:</strong> {selectedPropertyList[7 + bookingDetails.roomType]}</p>
                                    <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
                                    <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
                                    <p><strong>Number of Nights:</strong> {getNumberOfDays(bookingDetails.checkInDate, bookingDetails.checkOutDate)}</p>
                                    <p><strong>Number of Guests:</strong> {bookingDetails.numGuests}</p>
                                    <p><strong>Number of Rooms:</strong> {Math.ceil(bookingDetails.numGuests / 4)}</p>
                                    <p><strong>Total Price:</strong> {getNumberOfDays(bookingDetails.checkInDate, bookingDetails.checkOutDate) * (selectedPropertyList[7 + bookingDetails.roomType] * Math.ceil(bookingDetails.numGuests / 4))}</p>
                                    
                                    <button onClick={handleConfirmBooking} className="btn btn-primary mt-3">Confirm Booking</button>

                                    {bookingStatus && <p className="text-success">{bookingStatus}</p>}
                                    {error && <p className="text-danger">{error}</p>}
                                </>
                            ) : (
                                <p>Loading booking details...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Confirmed</h5>
                            </div>
                            <div className="modal-body">
                                <p>Your booking has been confirmed!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary color-red" onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentPage;
