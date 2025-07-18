import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
  const [userInfos, setUserInfos] = useState({
    password: "",
    email: "",
    pseudo: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (userInfos.password != "" && userInfos.email != "") {
      signInWithEmailAndPassword(getAuth(), userInfos.email, userInfos.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => setError("Email ou mot de passe incorrect"));
    } else {
      setError("Veuillez renseigner les champs");
    }
  }

  return (
    <div>
      <h1>Snippet Collector</h1>
      <p>Connexion</p>
      <form className="snippet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          className="snippet-form-input"
          placeholder="E-mail"
          onChange={(e) => setUserInfos({ ...userInfos, email: e.target.value })}
        />
        <input
          type="password"
          name="pwd"
          id="pwd"
          className="snippet-form-input"
          placeholder="Mot de passe"
          onChange={(e) => setUserInfos({ ...userInfos, password: e.target.value })}
        />
        <input type="submit" value="Se connecter" className="snippet-form-input" />
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
