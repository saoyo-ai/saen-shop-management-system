import { useState } from "react";

function Trousers() {
  const [inventory, setInventory] = useState([]);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  const addInventory = () => {
    if (!size || !color || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      size,
      color,
      stock,
    };

    setInventory([...inventory, newItem]);

    setSize("");
    setColor("");
    setStock("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trousers Inventory</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={inputStyle}
        />

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
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.size}</td>
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

export default Trousers;