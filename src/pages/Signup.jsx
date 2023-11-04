import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingButton from "../components/LoadingButton";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = React.useState({});
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      toast.success("Account has been created successfully");
      navigate("/");
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        return setError({ message: "Email has been used before" });
      }
      if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        return setError({ message: "Password should be at least 6 characters" });
      }
      setError(err);
    } finally {
      setLoading(false);
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
          required
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          required
        />
        <LoadingButton loading={loading} className="w-100 btn btn-primary">
          Sign Up
        </LoadingButton>
      </form>
    </div>
  );
}

export default Signup;
