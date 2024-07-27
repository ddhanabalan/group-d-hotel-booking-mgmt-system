import { useState } from 'react';
import { Link, json } from "react-router-dom";
import axios from 'axios';
import HeaderUser from '../Components/HeaderUser';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Components/Header";



const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { username, password };
        
        axios
            .post('http://localhost:5000/login', userData)
            .then((response) => {
                console.log(response);
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('UserType', 'user');
                    localStorage.setItem('username', username); // Store username
                    window.location.href = '/'; // Redirect to home page
                } else {
                    alert('Invalid userID or password ' + response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputusername1" className="form-label">
                                <strong>Username</strong>
                            </label>
                            <input 
                                type="Username" 
                                placeholder="Enter Username"
                                className="form-control" 
                                id="exampleInputusername1" 
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/Register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login