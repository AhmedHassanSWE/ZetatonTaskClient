import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useContext } from "react";
import { AppContext } from "../App";

function Navbar() {
  const user = useContext(AppContext);
  return (
    <nav className="flex-between">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      {user?.email ? (
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <Logout />
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
