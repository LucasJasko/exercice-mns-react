import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import Search from "./Search";
import List from "./List";

function App() {
  const [snippetList, setSnippetList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("snippetList"));
    if (Array.isArray(storage)) {
      setSnippetList(JSON.parse(localStorage.getItem("snippetList")));
    } else {
      setSnippetList([]);
    }
  }, []);

  return (
    <div className="main">
      <h1>Snippet collector</h1>
      <Search setKeyword={setKeyword} />
      <span className="line"></span>
      <Form snippetList={snippetList} setSnippetList={setSnippetList} />
      <span className="line"></span>
      <List snippetList={snippetList} setSnippetList={setSnippetList} keyword={keyword} />
    </div>
  );
}

export default App;
