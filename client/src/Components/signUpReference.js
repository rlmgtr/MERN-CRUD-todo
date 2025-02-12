import React, { useState } from 'react';
import { API_URL } from '../APIs/TodoAPIs';

const SignUp = () => {
  const [SignUpData, setSignUpData] = useState({
    firstName: '',  // Fixed typo (was 'firsName')
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setSignUpData({
      ...SignUpData,  // Fixed reference (was 'formData')
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(SignUpData)  // Fixed reference (was 'formData')
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration Success!');
      } else {
        setError(data.message || 'Registration failed. Please try again');
      }
    } catch (err) {
      setError('Server error - please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>  {/* Added form */}
        First Name:
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={SignUpData.firstName}  // Added controlled input
          onChange={handleChange}
        />

        Last Name:
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={SignUpData.lastName}  // Added controlled input
          onChange={handleChange}
        />

        Email:
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={SignUpData.email}  // Added controlled input
          onChange={handleChange}
        />

        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={SignUpData.password}  // Added controlled input
          onChange={handleChange}
        />

        <button type="submit">Sign Up!</button>  {/* Now works correctly */}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default SignUp;
