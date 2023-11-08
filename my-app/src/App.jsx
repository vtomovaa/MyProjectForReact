import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import Products from './components/Products/Products.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Footer from './components/Footer/Footer.jsx'

const App =()=> {

  return (
    <div className='app-wrapper'>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='contacts' element={<Contacts />}/>
      <Route path='products' element={<Products />}/>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
