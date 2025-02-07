import LogIn from './LogIn';
import SignUp from './SignUp';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
 


const HomePage = () => {
  return (
 <Router>
<div>
 <LogIn />


<div> 
dont have an acount yet? click here to sign up
</div>

 


      
    </div>
    </Router>
  )
}

export default HomePage
