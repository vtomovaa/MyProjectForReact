import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import AllOrchids from "./components/AllOrchids/AllOrchids.jsx";
import { AuthProvider } from "./context/authContext.jsx";

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
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
