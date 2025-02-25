import Home from "./Components/Home";
import Weather from "./Components/Weather"; 
import News from "./Components/News";
import './Styles/appstyle.scss'



function App() {
  

  return (
    <>
      <div className="crud">

 <div> 
<ul className="weatherAndNews">   
<li><div className="weatherdiv"><Weather /></div></li>
<li><div className="newsdiv"><News /></div></li>
</ul>  
</div> 


<div className="tododiv"><Home/></div>

      </div>
      

      
    </>
  )
}

export default App
