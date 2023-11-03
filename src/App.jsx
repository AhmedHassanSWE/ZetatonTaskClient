/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./bootstrap.css";
import axios from "axios";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";

export const AppContext = React.createContext();
function App() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  React.useEffect(() => {
    if (user?.accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user?.accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  return (
    <AppContext.Provider value={user}>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          {!user?.email && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Login />} />
            </>
          )}
          {user?.email && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
