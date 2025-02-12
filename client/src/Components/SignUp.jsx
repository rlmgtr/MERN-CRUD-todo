import React, { useState } from 'react';
import { API_URL } from '../APIs/TodoAPIs';

const SignUp = () => {

  const [SignUpData, setSignUpData] = useState({
firstName: '',
lastName: '',
email: '',
password: ''
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

try {
const response = await fetch(`${API_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'}, 
body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (response.ok) { 
    setSuccess('Registration Success!')
  } else {
setError(data.message || 'Registration failed. Please try again');
  }

}catch (err) {
  setError('Server error - please try again later.')
;}


}
};


  return (
    <div>
      First Name <input type='text' name='firstName' placeholder='First Name'/>
      Last Name <input type='text' name='lastName' placeholder='Last Name'/>
      Email <input type='email' name='email' placeholder='Email'/>
      Password <input type='password' name='password' placeholder='Password'/>

      <button type='submit'>Sign Up!</button>
    </div>
  )


export default SignUp




