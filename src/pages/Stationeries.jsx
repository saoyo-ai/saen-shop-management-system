import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Stationeries() {
  const [items, setItems] = useState([]);

  const [itemName, setItemName] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "stationeries")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setItems(data || []);
  };

  const addItem = async () => {
    if (!itemName || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category: "stationeries",
        item_name: itemName,
        stock: Number(stock),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItems();
    setItemName("");
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
      <h1>Stationeries Inventory</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="3">No items found</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.stock}</td>
                <td>
                  <button onClick={() => updateStock(item.id, item.stock, -1)}>
                    -1
                  </button>

                  <button onClick={() => updateStock(item.id, item.stock, 1)}>
                    +1
                  </button>

                  <button onClick={() => deleteItem(item.id)}>
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