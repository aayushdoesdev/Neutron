import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./scenes/homePage"
import LoginPage from "./scenes/loginPage"
import Navbar from "./scenes/navbar"
import ProfilePage from "./scenes/profilePage"

function App() {
  

  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:userID" element={<ProfilePage/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
