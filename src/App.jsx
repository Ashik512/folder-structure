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
      tree.items.push({
        id: new Date().getTime(),
        title: title,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, title);
    });

    return { ...tree, items: latestNode };
  }

  function insert(folderId, title) {
    const finalData = insertNode(data, folderId, title);
    setData(finalData);
  }

  useEffect(() => {
    localStorage.setItem("demoData", JSON.stringify(data));
  }, [data]);

  return <Folder data={data} onAdd={insert} />;
}

export default App;
