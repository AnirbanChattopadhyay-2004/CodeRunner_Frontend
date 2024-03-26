import Landuppage from "./components/Landup"
import Page2 from "./components/Page2"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
      
    <Route path="/" element={<Landuppage/>}/>
    <Route path="/page" element={<div className="bg-hero-pattern min-h-[400vh] sm:w-full w-[400vw]"> <Page2/> </div>}/>
 
  
    </Routes>
    </Router>
    </div>
  )
}

export default App
