import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cursor from "./components/Cursor/Cursor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBot2 from "./components/ChatBot/Chatbox2";

function App() {
  return (
    <>
      <Router>
        <div className="App cursor-none">
          <Cursor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ChatBot" element={<ChatBot2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
