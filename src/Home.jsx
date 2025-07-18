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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isUserInfos = false;
    let isSnippetList = false;

    const user = getAuth().currentUser;

    onValue(ref(getDatabase(), `${user.uid}/userInfos/pseudo`), (snapshot) => {
      if (snapshot.val()) {
        setUserInfos({ pseudo: snapshot.val(), uid: user.uid });
      }
      isUserInfos = true;
      if (isUserInfos && isSnippetList) setIsLoading(false);
    });

    onValue(ref(getDatabase(), `${user.uid}/snippetList`), (snapshot) => {
      if (snapshot.val()) {
        setSnippetList(snapshot.val());
      }
      isSnippetList = true;
      if (isUserInfos && isSnippetList) setIsLoading(false);
    });
  }, []);

  return (
    <div className="main">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="topbar">
            <p className="topbar-left">Connecté en tant que {userInfos.pseudo}</p>
            <button className="topbar-right" onClick={disconnectUser}>
              Déconnexion
            </button>
          </div>
          <h1>Snippet collector</h1>
          <Search setKeyword={setKeyword} />
          <span className="line"></span>
          <Form userInfos={userInfos} snippetList={snippetList} setSnippetList={setSnippetList} />
          <span className="line"></span>
          <List userInfos={userInfos} snippetList={snippetList} setSnippetList={setSnippetList} keyword={keyword} />
        </>
      )}
    </div>
  );
};

export default Home;
