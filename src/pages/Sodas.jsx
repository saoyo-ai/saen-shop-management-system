import { useState } from "react";

function Sodas() {
  const [sodas, setSodas] = useState([
    {
      name: "Predator",
      stock: 0,
      addStock: "",
    },
    {
      name: "Bottle Soda",
      stock: 0,
      addStock: "",
    },
    {
      name: "Take Away Soda",
      stock: 0,
      addStock: "",
    },
  ]);

  const handleInputChange = (index, value) => {
    const updatedSodas = [...sodas];

    updatedSodas[index].addStock = value;

    setSodas(updatedSodas);
  };

  const addStock = (index) => {
    const updatedSodas = [...sodas];

    const addedAmount =
      Number(updatedSodas[index].addStock);

    if (!addedAmount) {
      alert("Enter stock amount");
      return;
    }

    updatedSodas[index].stock += addedAmount;

    updatedSodas[index].addStock = "";

    setSodas(updatedSodas);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Soda Inventory</h1>

      <table
        border="1"
        cellPadding="10"
        style={tableStyle}
      >
        <thead>
          <tr>
            <th>Soda Type</th>
            <th>Current Stock</th>
            <th>Add Stock</th>
          </tr>
        </thead>

        <tbody>
          {sodas.map((soda, index) => (
            <tr key={index}>
              <td>{soda.name}</td>

              <td>{soda.stock}</td>

              <td>
                <input
                  type="number"
                  placeholder="Add stock"
                  value={soda.addStock}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                <button
                  onClick={() => addStock(index)}
                  style={buttonStyle}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
};

const inputStyle = {
  padding: "8px",
  marginRight: "10px",
};

const buttonStyle = {
  padding: "8px 15px",
  cursor: "pointer",
};

export default Sodas;