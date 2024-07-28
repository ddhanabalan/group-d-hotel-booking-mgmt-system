import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HotelRoomDetail } from '../Detail/HotelDetail'; // Ensure this path is correct

const ManagerRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pid, setPid] = useState(0); // Initialize pid as an integer
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [pidError, setPidError] = useState(''); // PID error state
  const navigate = useNavigate();

  // Function to check if PID exists
  const checkPidExists = (pid) => {
    return HotelRoomDetail.some(hotel => hotel.pid === pid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if the PID exists in the HotelDetail data
    if (!checkPidExists(pid)) {
      setPidError('Property ID does not exist.');
      return;
    }

    setLoading(true); // Start loading

    axios
      .post('http://localhost:5000/signup/mngr', { username, password, pid, email }) // Send pid as an integer
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert('Unknown Error');
        } else if (response.data.result === 'username or email already in use!') {
          alert('E-mail already registered! Please Login to proceed.');
          navigate('/Managerlogin');
        } else {
          alert('Registered successfully! Please Login to proceed.');
          navigate('/ManagerLogin');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage: 'linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))',
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className="mb-3 text-primary">Manager Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputUsername1" className="form-label">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                id="exampleInputUsername1"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPid1" className="form-label">
                <strong>Property ID</strong>
              </label>
              <input
                type="number" // Use type="number" for integer input
                placeholder="Enter Property ID"
                className="form-control"
                id="exampleInputPid1"
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  setPid(value);
                  setPidError(''); // Clear error when user changes the value
                }}
                required
              />
              {pidError && <div className="text-danger mt-2">{pidError}</div>} {/* Display PID error */}
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {loading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <p className="container my-2">Already have an account?</p>
          <Link to="/ManagerLogin" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerRegister;