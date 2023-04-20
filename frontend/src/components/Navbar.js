import { Link } from "react-router-dom";

const Navbar = () => {
  return (
        <>
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/rsa">RSA</Link>
            <Link to="/aes">AES</Link>
            <Link to="/base64">Base 64</Link>
            <Link to="/tutorial">Tutorial Page</Link>
        </div>
        </>
  );
}

export default Navbar;