import React, { useState } from 'react'
import { API_URL } from '../APIs/TodoAPIs';









const LogIn = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError ] = useState('');
const [loading, setLoading] = setLoading('false');


const handleLogin = async (e) => {
e.preventDefault();
setError('');
setLoading(true);

try {

  const response = await fetch (`${API_URL}/login`, {
METHOD: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({email, password})
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.message || 'Login Failed' );
}






}

}










  return (
    <div>

    username
    <input type='text' name='username' placeholder='USERNAME' />

    password
    <input type='password' name='password' placeholder='PASSWORD' />

    <button type='submit'>Log in</button>
      
    </div>
  )
}

export default LogIn
