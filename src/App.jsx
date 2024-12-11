import Landuppage from "./components/Landup"
import Page2 from "./components/Page2"
import ShareCode from "./components/ShareCode"
import CollabCode from "./components/CollabCode"
import CollabRoom from "./components/CollabRoom"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
      
    <Route path="/" element={<Landuppage/>}/>
    <Route path="/page" element={<div className="bg-hero-pattern min-h-[400vh] sm:w-full w-[400vw]"> <Page2/> </div>}/>
    <Route path="/page/:id" element={<ShareCode/>}/>
    <Route path="/collab" element={<CollabRoom/>}/>
    <Route path="/collab/:room" element={<CollabCode/>}/>
 
  
    </Routes>
    </Router>
    </div>
  )
}

export default App
