import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Skirts() {
  const [items, setItems] = useState([]);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "skirts")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setItems(data || []);
  };

  const addItem = async () => {
    if (!size || !color || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category: "skirts",
        size,
        color,
        stock: Number(stock),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItems();

    setSize("");
    setColor("");
    setStock("");
  };

  const updateStock = async (id, currentStock, change) => {
    const newStock = currentStock + change;

    if (newStock < 0) {
      alert("Stock cannot go below 0");
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({ stock: newStock })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItems();
  };

  const deleteItem = async (id) => {
    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skirts Inventory</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addItem}>Add Skirt</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4">No skirts found</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{item.stock}</td>

                <td>
                  <button onClick={() => updateStock(item.id, item.stock, -1)}>
                    -1
                  </button>

                  <button
                    onClick={() => updateStock(item.id, item.stock, 1)}
                    style={{ marginLeft: "5px" }}
                  >
                    +1
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}