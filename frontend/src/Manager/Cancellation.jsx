import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CancellationPrediction({ bookingId }) {
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'http://localhost:5000/predict';
  const accessToken = localStorage.getItem('token');
  const PID = localStorage.getItem('pid');

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.post(apiUrl, { rid: bookingId, pid: PID }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          setPrediction(response.data.result);
        } else {
          setPrediction('No prediction available');
        }
      } catch (error) {
        console.error('Error making cancellation request:', error);
        setError('Failed to fetch prediction.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [bookingId, apiUrl, accessToken, PID]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return <span>{prediction}</span>;
}

export default CancellationPrediction;
