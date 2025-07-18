import "./App.css";
import "../firebase.js";

import Login from "./Login";
import Home from "./Home.jsx";
import Signin from "./Signin.jsx";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoging, setIsLoging] = useState(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      user ? setIsConnected(true) : setIsConnected(false);
    });
  }, []);

  function disconnectUser() {
    getAuth().signOut();
    setIsConnected(false);
  }

  return (
    <>
      {isConnected ? (
        <Home disconnectUser={disconnectUser} />
      ) : (
        <>
          {isLoging ? <Login /> : <Signin />} <button onClick={() => setIsLoging(!isLoging)}>{isLoging ? "S'inscrire" : "Se connecter"}</button>
        </>
      )}
    </>
  );
}

export default App;
