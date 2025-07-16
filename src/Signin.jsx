import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEMail] = useState("");
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <div>
      <h1>Inscription</h1>
      <form className="snippet-form">
        <input type="text" name="email" id="email" className="snippet-form-input" placeholder="E-mail" />
        <input type="text" name="pwd" id="pwd" className="snippet-form-input" placeholder="Mot de passe" />
        <input type="submit" value="S'inscrire" className="snippet-form-input" />
      </form>
    </div>
  );
};

export default Signin;
