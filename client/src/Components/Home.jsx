import React, { useState, useEffect } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TodoPage from './TodoPage';
import { HashRouter  as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
const token = localStorage.getItem('token');
setIsLoggedIn(!!token);
  }, [])

  const handleLogInSuccess = () => {
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
          <ul> 
            <h2>
  Have Plans? do it with ToDo Web App
</h2>
         
         <li>  {!isLoggedIn && <NavLink to='/signup'>Sign Up</NavLink> } 
         </li>
         <li>
          <h3>Already have an account?</h3>
           {!isLoggedIn && <NavLink to='/login'>Log in</NavLink> } </li>
         </ul>
         {isLoggedIn && <button onClick={handleLogout}>Log Out</button> } 
        </div>

        <div className='content'>
          <Routes>

          <Route path='/' 
            element={isLoggedIn ? <Navigate to='/' /> : <SignUp/> } />
         
            <Route path='/login' 
            element={isLoggedIn ? <Navigate to ='/todos' /> : <LogIn onLoginSuccess= {handleLogInSuccess}/> } />

            <Route path='/signup' 
            element={isLoggedIn ? <Navigate to='/todos' /> : <SignUp/> } />

            <Route path='/todos' 
            element={isLoggedIn ? <TodoPage />: <Navigate to='/login'/>} />
            

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;











