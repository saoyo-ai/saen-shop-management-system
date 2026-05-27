import { useState } from "react";

function MathBooks() {
  const [inventory, setInventory] = useState([]);

  const [pages, setPages] = useState("");
  const [stock, setStock] = useState("");

  const addInventory = () => {
    if (!pages || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      pages,
      stock,
    };

    setInventory([...inventory, newItem]);

    setPages("");
    setStock("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mathematics Books Inventory</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Number of Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
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
            <th>Pages</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.pages}</td>
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

export default MathBooks;