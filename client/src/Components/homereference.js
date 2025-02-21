import React, { useState, useEffect } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TodoPage from './TodoPage';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <div className='nav'>
          {!isLoggedIn && <NavLink to='/login'>Log in</NavLink>}
          {!isLoggedIn && <NavLink to='/signup'>Sign Up</NavLink>}
          {isLoggedIn && <NavLink to='/todos'>Todos</NavLink>}
          {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
        </div>

        <div className='content'>
          <Routes>
            <Route 
              path='/login' 
              element={isLoggedIn ? <Navigate to='/todos' /> : <LogIn onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path='/signup' 
              element={isLoggedIn ? <Navigate to='/todos' /> : <SignUp />} 
            />
            <Route 
              path='/todos' 
              element={isLoggedIn ? <TodoPage /> : <Navigate to='/login' />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;
