import { useState } from "react";

function Sweaters() {
  const [sweaters, setSweaters] = useState([
    {
      size: "28",
      color: "Green",
      stock: 12,
    },

    {
      size: "30",
      color: "Green",
      stock: 8,
    },
  ]);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  const addSweater = () => {
    if (!size || !color || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newSweater = {
      size,
      color,
      stock,
    };

    setSweaters([...sweaters, newSweater]);

    setSize("");
    setColor("");
    setStock("");
  };

  const deleteSweater = (indexToDelete) => {
    const updatedSweaters = sweaters.filter(
      (_, index) => index !== indexToDelete
    );

    setSweaters(updatedSweaters);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sweaters Inventory</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Add New Sweater</h2>

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

        <button onClick={addSweater} style={buttonStyle}>
          Add Sweater
        </button>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sweaters.map((item, index) => (
            <tr key={index}>
              <td>{item.size}</td>

              <td>{item.color}</td>

              <td>{item.stock}</td>

              <td>
                <button
                  onClick={() => deleteSweater(index)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "8px 15px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Sweaters;