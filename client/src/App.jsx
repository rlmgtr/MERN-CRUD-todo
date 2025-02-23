import Home from "./Components/Home";
import Weather from "./Components/Weather"; 
import News from "./Components/News";
import './Styles/weatherAndNews.scss'



function App() {
  

  return (
    <>
      <div>

 <div> 
  <ul className="weatherAndNews">   
<li><div className="weatherdiv"><Weather /></div></li>
<li><div className="newsdiv"><News /></div></li>
</ul>  
</div> 


<div className="enrtydiv"><Home/></div>

      </div>
      

      
    </>
  )
}

export default App
