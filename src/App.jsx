import { useState, useEffect } from "react";
import "./App.css";
import "../firebase.js";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Signin from "./Signin.jsx";
import Home from "./Home.jsx";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoging, setIsLoging] = useState(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const uid = user.uid;
        setIsConnected(true);
        console.log(uid);
      } else {
        setIsConnected(false);
        console.log("Non connecté");
      }
    });
  }, []);

  return (
    <>
      {isConnected ? (
        <Home />
      ) : (
        <>
          {isLoging ? <Login /> : <Signin />} <button onClick={() => setIsLoging(!isLoging)}>{isLoging ? "S'inscrire" : "Se connecter"}</button>
        </>
      )}
    </>
  );
}

export default App;
