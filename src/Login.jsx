import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEMail] = useState("");

  useEffect(() => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []);

  return (
    <div>
      <h1>Connexion</h1>
      <form className="snippet-form">
        <input type="text" name="email" id="email" className="snippet-form-input" placeholder="E-mail" />
        <input type="text" name="pwd" id="pwd" className="snippet-form-input" placeholder="Mot de passe" />
        <input type="submit" value="Se connecter" className="snippet-form-input" />
      </form>
    </div>
  );
};

export default Login;
