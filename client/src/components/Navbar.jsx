import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div id="navLinksContainer">
        <Link to="/" className="navLinks">Home</Link>
        <Link to="/chat" className="navLinks">Chat</Link>
        <Link to="/about" className="navLinks">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
