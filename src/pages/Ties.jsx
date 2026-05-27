import { useState } from "react";

function Ties() {
  const [inventory, setInventory] = useState([]);

  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  const addInventory = () => {
    if (!color || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      color,
      stock,
    };

    setInventory([...inventory, newItem]);

    setColor("");
    setStock("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ties Inventory</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
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
            <th>Color</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.color}</td>
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

export default Ties;