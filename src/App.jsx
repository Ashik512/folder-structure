import { useEffect, useState } from "react";
import Folder from "./components/Folder";
import { folderData } from "./data/folderData";

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("demoData");
    return savedData ? JSON.parse(savedData) : folderData;
  });

  function insertNode(tree, folderId, title) {
    if (tree.id === folderId) {
      return {
        ...tree,
        items: [
          ...tree.items,
          { id: new Date().getTime(), title: title, items: [] },
        ],
      };
    }

    return {
      ...tree,
      items: tree.items.map((item) => insertNode(item, folderId, title)),
    };
  }

  function insert(folderId, title) {
    setData((prevData) => insertNode(prevData, folderId, title));
  }

  useEffect(() => {
    localStorage.setItem("demoData", JSON.stringify(data));
  }, [data]);

  return <Folder data={data} onAdd={insert} />;
}

export default App;
