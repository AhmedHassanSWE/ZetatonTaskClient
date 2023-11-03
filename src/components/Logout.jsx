import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <li onClick={logout}>
      <Link to="/signin">Logout</Link>
    </li>
  );
}

export default Logout;
