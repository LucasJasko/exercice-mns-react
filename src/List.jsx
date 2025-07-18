import { useEffect, useState } from "react";
import Item from "./Item";

const List = ({ userInfos, snippetList, setSnippetList, keyword }) => {
  const [filteredSnippetList, setFilteredSnippetList] = useState([]);

  useEffect(() => {
    setFilteredSnippetList(snippetList);
  }, []);

  useEffect(() => {
    if (keyword == "") {
      setFilteredSnippetList(snippetList);
    } else {
      const filtered = snippetList.filter(
        (snippet) => snippet.title.toLowerCase().includes(keyword.toLowerCase()) || snippet.language.toLowerCase().includes(keyword.toLowerCase())
      );

      setFilteredSnippetList(filtered);
    }
  }, [keyword, snippetList]);

  return (
    <ul className="snippet-list">
      {filteredSnippetList.length == 0 ? (
        keyword == "" ? (
          <p></p>
        ) : (
          <p>Aucun résultat</p>
        )
      ) : (
        filteredSnippetList.map((snippet, i) => (
          <Item key={i} index={i} uid={userInfos.uid} snippet={snippet} snippetList={snippetList} setSnippetList={setSnippetList} />
        ))
      )}
    </ul>
  );
};

export default List;
