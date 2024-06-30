import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Forgot from './components/Forgot/Forgot'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Cursor from './components/Cursor/Cursor'
import Reset from './components/Reset/Reset'
import About from './components/About/About'
import ChatBot from './components/ChatBot/ChatBot'
import MentalHealthForm from './components/Form/MentalHealthForm/MentalHealthForm'
import PhysicalHealthForm from './components/Form/PhysicalHealthForm/PhysicalHealthForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="App cursor-none">
          <Cursor />
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/ChatBot" element={<ChatBot />} />
            <Route path="/MentalHealthForm" element={<MentalHealthForm />} />
            <Route path="PhysicalHealthForm" element={<PhysicalHealthForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password" element={<Reset />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
