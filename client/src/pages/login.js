import Axios from 'axios';
import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom"

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    let navigate = useNavigate();
  
    const login = () => {
        console.log("caiu no login")
        Axios.post('http://localhost:3001/login', {
            username: username, 
            password: password
        }).then((response) => {
            if (response.data.auth == true) {
                sessionStorage.setItem("token", response.data.token)
                navigate('/home');
            } else 
                setLoginStatus(response.data.message);
        })};

    return (
        <div className="login">
        <h1>Login</h1>

        <div>
        <input className='sign-up-input' type="text" placeholder="Username..." onChange={(e) => {
            setUsername(e.target.value)}}/>
        </div>

        <div>
        <input className='sign-up-input'  type="password" placeholder="Password..." onChange={(e) => {
            setPassword(e.target.value)}}/>
        </div>
        <div>
            <nav>
                <Link className="newaccount" to="/signup">New Account</Link>
            </nav>
        </div>
        <div>
            <button className='button-register' onClick={login}>Login</button>
        </div>
        
        <p>{loginStatus}</p>
    </div>
    )

};

export default Login;