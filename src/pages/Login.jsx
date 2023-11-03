import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate("/");
  const [error, setError] = React.useState({});
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("You have been logged in successfully");
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err);
    }
  };

  return (
    <div className="container">
      <div>
        {error?.message && <p className="text-center error-flash">{error?.message}</p>}
        <h3>Sign In </h3>
        <form onSubmit={login}>
          <input
            autoFocus
            type="email"
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button className="w-100 btn btn-primary"> Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
