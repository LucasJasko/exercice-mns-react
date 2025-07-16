import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";

const Signin = () => {
  const [userInfos, setUserInfos] = useState({
    password: "",
    email: "",
    pseudo: "",
  });

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (userInfos.password != "" && userInfos.email != "" && userInfos.pseudo != "") {
      if (userInfos.password.length > 6) {
        createUserWithEmailAndPassword(getAuth(), userInfos.email, userInfos.password)
          .then((userCredential) => {
            const uid = userCredential.user.uid;
            set(ref(getDatabase(), `${uid}/userInfos`), { pseudo: userInfos.pseudo });
            setError("Inscription validé !");
          })
          .catch((error) => setError(error.message));
      } else {
        setError("Veuillez renseigner un mot de passe de 6 caractères minimum");
      }
    } else {
      setError("Veuillez renseigner tous les champs");
    }
  }

  return (
    <div>
      <h1>Inscription</h1>
      <form className="snippet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          className="snippet-form-input"
          placeholder="Pseudo"
          onChange={(e) => setUserInfos({ ...userInfos, pseudo: e.target.value })}
        />
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
        <input type="submit" value="S'inscrire" className="snippet-form-input" />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
