import { useState } from "react";

function JuniorBooks() {
  const [inventory, setInventory] = useState([]);

  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [stock, setStock] = useState("");

  const addInventory = () => {
    if (!title || !grade || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      title,
      grade,
      stock,
    };

    setInventory([...inventory, newItem]);

    setTitle("");
    setGrade("");
    setStock("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Junior & Lower Primary Books</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addInventory} style={buttonStyle}>
          Add Stock
        </button>
      </div>

      <table border="1" cellPadding="10" style={tableStyle}>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Grade</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.grade}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formStyle = {
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  marginRight: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
};

export default JuniorBooks;