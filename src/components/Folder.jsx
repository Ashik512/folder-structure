import { useState } from "react";

const Folder = ({ data, onAdd = () => {} }) => {
  const [title, setTitle] = useState("");

  function handleAdd(folderId) {
    onAdd(folderId, title);
    setTitle("");
  }

  return (
    <div>
      <span>{data.title}</span>{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => handleAdd(data.id)}>Add</button>
      <div style={{ marginLeft: 30, marginTop: 5 }}>
        {data.items.map((d) => {
          return <Folder data={d} key={d.id} onAdd={onAdd} />;
        })}
      </div>
    </div>
  );
};

export default Folder;
