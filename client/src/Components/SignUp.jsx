import React, { useState } from 'react';

const SignUp = () => {

  const [SignUpData, setSignUpData] = useState({
firsName: '',
lastName: '',
email: '',
password: ''
  });

const [error, setError] = useState('');
const [success, setSuccess] = useState('')




  return (
    <div>
      First Name <input type='text' name='firstName' placeholder='First Name'/>
      Last Name <input type='text' name='lastName' placeholder='Last Name'/>
      Email <input type='email' name='email' placeholder='Email'/>
      Password <input type='password' name='password' placeholder='Password'/>
    </div>
  )
}

export default SignUp




