import Axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [message, setMessage] = useState("");
  
  let navigate = useNavigate();

  const register = () => {

    if(passwordReg === validPassword && passwordReg != '' && usernameReg != '') {
      setMessage('');
      Axios.post('http://localhost:3001/register', {
        username: usernameReg, 
        password: passwordReg
      }).then((response) => {
        if(response.status === 200) {
          navigate("/");
        } else {
          setMessage('Something went wrong: ' + response.data.message)
        }
      });
    } else {
      setMessage('Invalid data');
    }
  }
    
  return (
    <div className="registration">
    <h1>Sign up</h1>

    <div>
      <input className='sign-up-input' type="text" placeholder="Username" onChange={(e) => {
        setUsernameReg(e.target.value)}}/>
    </div>

    <div>
      <input className='sign-up-input' type="password" placeholder='Password' onChange={(e) => {
        setPasswordReg(e.target.value)}}/>
    </div>

    <div>
      <input className='sign-up-input' type="password" placeholder='Confirm Password' onChange={(e) => {
        setValidPassword(e.target.value)}}/>
    </div>

    <div className='signupvalid'>{message}</div>
    <div className='divterms'>
      <input type="checkbox"/> I agree to the <span className='termos'>terms and conditions.</span>
    </div>

    <button className='button-register' title='Cadastrar' onClick={register}>Register</button>
  </div>
  );
};

export default Signup;