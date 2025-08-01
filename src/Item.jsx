import "../firebase.js";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const Item = ({ uid, index, snippet, snippetList, setSnippetList }) => {
  const [editing, setEditing] = useState(false);
  const [codeAreaHeight, setCodeAreaHeight] = useState();
  const [editedItem, setEditedItem] = useState({
    title: snippet.title,
    language: snippet.language,
    code: snippet.code,
  });

  useEffect(() => {
    setCodeAreaHeight(document.querySelector(`.item-snippet-container-${index}`).clientHeight);
  }, []);

  function editItem(e) {
    setEditing(!editing);
  }

  function deleteItem(e) {
    e.preventDefault();
    const newList = snippetList.filter((snippet, i) => i !== index);
    setSnippetList(newList);
    set(ref(getDatabase(), `${uid}/snippetList`), newList);
  }

  function saveNewItem(e) {
    e.preventDefault();
    const newList = snippetList.map((item, i) => (i == index ? editedItem : item));
    newList.map((item, i) => {
      if (i == index) update(ref(getDatabase(), `${uid}/snippetList/${i}`), editedItem);
    });

    setSnippetList(newList);
    setEditing(!editing);
  }

  return (
    <li className="item">
      {editing ? (
        <form onSubmit={saveNewItem}>
          <div className="item-header">
            <div className="item-header-left item-header-left-edit">
              <input
                className="edit-item-input edit-item-title"
                type="text"
                defaultValue={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
              />
              <input
                className="edit-item-input edit-item-language"
                type="text"
                defaultValue={editedItem.language}
                onChange={(e) => setEditedItem({ ...editedItem, language: e.target.value })}
              />
            </div>
            <div className="item-header-right">
              <button onClick={editItem}>Annuler</button>
              <input className="edit-item-submit" type="submit" value="Sauvegarder" />
            </div>
          </div>
          <div className="item-snippet-container">
            <textarea
              style={{ minHeight: codeAreaHeight }}
              className="edit-item-input edit-item-code"
              name="snippet"
              id="snippet"
              defaultValue={editedItem.code}
              onChange={(e) => setEditedItem({ ...editedItem, code: e.target.value })}
            ></textarea>
          </div>
        </form>
      ) : (
        <>
          <div className="item-header">
            <div className="item-header-left">
              <h2 className="item-title">{editedItem.title}</h2>
              <span className="item-language">- {editedItem.language}</span>
            </div>
            <div className="item-header-right">
              <button onClick={editItem}>Modifier</button>
              <button onClick={deleteItem}>Supprimer</button>
            </div>
          </div>
          <div className={`item-snippet-container item-snippet-container-${index}`}>
            <SyntaxHighlighter style={dark}>{editedItem.code}</SyntaxHighlighter>
            {/* <code className="item-snippet-text">{snippet.code}</code> */}
          </div>
        </>
      )}
    </li>
  );
};

export default Item;
