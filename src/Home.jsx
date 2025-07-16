import Form from "./Form";
import Search from "./Search";
import List from "./List";
import "../firebase.js";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const Home = ({ disconnectUser }) => {
  const [snippetList, setSnippetList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    const user = getAuth().currentUser;
    console.log(user.uid);

    setUserInfos(user);

    onValue(ref(getDatabase(), `${user.uid}/snippetList`), (snapshot) => {
      if (snapshot.val()) setSnippetList(snapshot.val());
    });
  }, []);

  return (
    <div className="main">
      <div className="topbar">
        <p className="topbar-left">Connecté en tant que {userInfos.email}</p>
        <button className="topbar-right" onClick={disconnectUser}>
          Déconnexion
        </button>
      </div>
      <h1>Snippet collector</h1>
      <Search setKeyword={setKeyword} />
      <span className="line"></span>
      <Form uid={userInfos.uid} snippetList={snippetList} setSnippetList={setSnippetList} />
      <span className="line"></span>
      <List userInfos={userInfos} snippetList={snippetList} setSnippetList={setSnippetList} keyword={keyword} />
    </div>
  );
};

export default Home;
