import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  const socket = socketIO.connect("http://localhost:3001");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
