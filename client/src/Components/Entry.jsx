import LogIn from './LogIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

const Entry = () => {
  return (
    <Router>
      <div>
        <div className='nav'>
          <NavLink to='/login'>Log in</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
        </div>

        <div className='entry'>
          <Routes>
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Entry;
