import LogIn from './LogIn';
import SignUp from './SignUp';
import TodoPage from './TodoPage';

import { HashRouter  as Router, Routes, Route, NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Router>
      <div>
        <div className='nav'>
          <NavLink to='/login'>Log in</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
        </div>

        <div className='content'>
          <Routes>
         
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/todos' element={<TodoPage />} />
            

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;
