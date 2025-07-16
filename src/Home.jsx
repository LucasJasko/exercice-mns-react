import Form from "./Form";
import Search from "./Search";
import List from "./List";
import "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const [snippetList, setSnippetList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    onValue(ref(getDatabase(), "snippetList"), (snapshot) => {
      if (snapshot.val()) setSnippetList(snapshot.val());
    });
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
};

export default Home;
