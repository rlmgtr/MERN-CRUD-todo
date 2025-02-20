import Home from "./Components/Home";
import Weather from "./Components/Weather"; 
import News from "./Components/News";

function App() {
  

  return (
    <>
      <div>
<div className="weatherdiv"><Weather /></div>
<div className="newsdiv"><News /></div>
<div className="enrtydiv"><Home/></div>

      </div>
      

      
    </>
  )
}

export default App
