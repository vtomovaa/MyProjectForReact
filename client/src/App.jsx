import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import { AuthProvider } from "./context/authContext.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AllOrchids from "./components/Orchid/AllOrchids/AllOrchids.jsx";
import OrchidDetails from "./components/Orchid/OrhidDetails/OrchidDetails.jsx";

const App =()=> {

  return (
    <AuthProvider>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contacts' element={<Contacts />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/all-orchids' element={<AllOrchids />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/all-orchids/:orchidId' element={<OrchidDetails />}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
