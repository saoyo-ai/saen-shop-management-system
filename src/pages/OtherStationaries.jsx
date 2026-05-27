import { useState } from "react";

function OtherStationaries() {
  const [items, setItems] = useState([
    {
      name: "Reams",
      stock: 0,
      addStock: "",
    },
    {
      name: "Files",
      stock: 0,
      addStock: "",
    },
    {
      name: "Scientific Calculators",
      stock: 0,
      addStock: "",
    },
    {
      name: "Geometrical Set",
      stock: 0,
      addStock: "",
    },
    {
      name: "Pencils",
      stock: 0,
      addStock: "",
    },
    {
      name: "Big Biro",
      stock: 0,
      addStock: "",
    },
    {
      name: "Sharp Pointed Big",
      stock: 0,
      addStock: "",
    },
    {
      name: "Obama Biros",
      stock: 0,
      addStock: "",
    },
  ]);

  const handleInputChange = (index, value) => {
    const updatedItems = [...items];

    updatedItems[index].addStock = value;

    setItems(updatedItems);
  };

  const addStock = (index) => {
    const updatedItems = [...items];

    const addedAmount = Number(
      updatedItems[index].addStock
    );

    if (!addedAmount) {
      alert("Enter stock amount");
      return;
    }

    updatedItems[index].stock += addedAmount;

    updatedItems[index].addStock = "";

    setItems(updatedItems);
  };

  const deleteStock = (index) => {
    const updatedItems = [...items];

    updatedItems[index].stock = 0;

    setItems(updatedItems);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Other Stationaries Inventory</h1>

      <table
        border="1"
        cellPadding="10"
        style={tableStyle}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock Management</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>

              <td>
                Current Stock: {item.stock}

                <div style={{ marginTop: "10px" }}>
                  <input
                    type="number"
                    placeholder="Add stock"
                    value={item.addStock}
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

                  <button
                    onClick={() => deleteStock(index)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
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
  marginRight: "10px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "8px 15px",
  cursor: "pointer",
};

export default OtherStationaries;