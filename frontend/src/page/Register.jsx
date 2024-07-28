import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [addr, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        const userData = { name, email, password, username, addr };
        
        axios
            .post('http://localhost:5000/signup/user', userData)
            .then(response => {
                console.log(response);
                if (response.data.error) {
                    alert("Unknown Error");
                } else if (response.data.result === "username or email already in use!") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    }

    return (
        <div>

            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Register</h2>
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
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputName1" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                id="exampleInputName1"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputAddress1" className="form-label">
                                <strong>Address</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                className="form-control"
                                id="exampleInputAddress1"
                                onChange={(event) => setAddress(event.target.value)}
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

                    <p className='container my-2'>Already have an account?</p>
                    <Link to='/Login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;