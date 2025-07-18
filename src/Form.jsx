import "../firebase.js";
import { useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect } from "react";

const Form = ({ userInfos, snippetList, setSnippetList }) => {
  const [error, setError] = useState();
  const [itemData, setItemData] = useState({
    title: "",
    language: "",
    code: "",
  });

  useEffect(() => {
    console.log(userInfos);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (itemData.code != "" && itemData.title != "" && itemData.language != "") {
      setSnippetList([...snippetList, itemData]);
      set(ref(getDatabase(), `${userInfos.uid}/snippetList`), [...snippetList, itemData]);
      setItemData({
        title: "",
        language: "",
        code: "",
      });
      document.querySelector("#title").value = "";
      document.querySelector("#language").value = "";
      document.querySelector("#snippet").value = "";
    } else {
      setError("Veuillez renseigner tous les champs");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <form className="snippet-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Titre du snippet</label>
      <input
        className="snippet-form-input snippet-form-title"
        type="text"
        name="title"
        id="title"
        placeholder="Mon super snippet"
        onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
      />
      <label htmlFor="language">Langage utilisé</label>
      <input
        className="snippet-form-input snippet-form-language"
        type="text"
        name="language"
        id="language"
        placeholder="PHP, Javascript, Python..."
        onChange={(e) => setItemData({ ...itemData, language: e.target.value })}
      />
      <label htmlFor="snippet">Contenu du snippet</label>
      <textarea
        className="snippet-form-input snippet-form-code"
        name="snippet"
        id="snippet"
        placeholder="console.log('Hello world !');"
        onChange={(e) => setItemData({ ...itemData, code: e.target.value })}
      ></textarea>
      <input className="snippet-form-input snippet-form-submit" type="submit" value="Enregistrer le snippet" />
      {error && <p className="snippet-form-error">{error}</p>}
    </form>
  );
};

export default Form;
