import { useState } from "react";

function GirlsSocks() {
  const [inventory, setInventory] = useState([]);

  const [stripeColor, setStripeColor] = useState("");
  const [sockColor, setSockColor] = useState("");
  const [stock, setStock] = useState("");

  const addInventory = () => {
    if (!stripeColor || !sockColor || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      stripeColor,
      sockColor,
      stock,
    };

    setInventory([...inventory, newItem]);

    setStripeColor("");
    setSockColor("");
    setStock("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Girls Socks Inventory</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Stripe Color"
          value={stripeColor}
          onChange={(e) => setStripeColor(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Sock Color"
          value={sockColor}
          onChange={(e) => setSockColor(e.target.value)}
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
            <th>Stripe Color</th>
            <th>Sock Color</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.stripeColor}</td>
              <td>{item.sockColor}</td>
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

export default GirlsSocks;