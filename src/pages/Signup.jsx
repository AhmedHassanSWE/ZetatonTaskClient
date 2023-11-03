import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = React.useState({});
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      toast.success("Account has been created successfully");
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err);
    }
  };
  return (
    <div className="container">
      {error?.message && <p className="text-center error-flash">{error?.message}</p>}
      <h3>Sign Up </h3>
      <form onSubmit={register}>
        <input
          autoFocus
          type="email"
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button className="w-100 btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
