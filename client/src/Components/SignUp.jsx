import React, { useState } from 'react';
import { API_URL } from '../APIs/TodoAPIs';

const SignUp = () => {

  const [SignUpData, setSignUpData] = useState({
firstName: '',
lastName: '',
email: '',
password: '',
confirmPassword: '',
  });

const [error, setError] = useState('');
const [success, setSuccess] = useState('')

const handleChange = (e) => {
 setSignUpData({
  ...SignUpData,
  [e.target.name]: e.target.value
 });
};


const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setSuccess('');


if (SignUpData.password !== SignUpData.confirmPassword) {
  setError('Passwords do not match');
  return;
 }

const { confirmPassword, ...dataToSend } = SignUpData;

try {
const response = await fetch(`${API_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'}, 
body: JSON.stringify(dataToSend),
  });

  const data = await response.json();

  if (response.ok) { 
    setSuccess(data.message || 'Registration Success!');

    setSignUpData({
firstName: '',
lastName: '',
email: '',
password: '',
confirmPassword: '',
    });

  } else {
setError(data.message || 'Registration failed. Please try again');
  }

}catch (err) {
  setError('Server error - please try again later.');
}
};


  return (
    <div>
      <ul className='signUpinfo'>
      <form onSubmit={handleSubmit}>
      <li> First Name <input type='text' name='firstName' placeholder='First Name' value={SignUpData.firstName} onChange={handleChange}/></li>
      <li> Last Name <input type='text' name='lastName' placeholder='Last Name' value={SignUpData.lastName} onChange={handleChange}/></li>
      <li>  Email <input type='email' name='email' placeholder='Email' value={SignUpData.email} onChange={handleChange}/></li>
      <li> Password <input type='password' name='password' placeholder='Password' value={SignUpData.password} onChange={handleChange}/></li>
      <li>Confirm Password <input type='password' name='confirmPassword' placeholder='Confrim your password' value={SignUpData.confirmPassword} onChange={handleChange} /></li>

      <button type='submit'>Sign Up!</button> {}
      </form>
      </ul>
{error && <p style={{ color:'red' }}>{error}</p>}
{success && <p style={{ color: 'green'}}>{success}</p>} 

    </div>
  );
};


export default SignUp




