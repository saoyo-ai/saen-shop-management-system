import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useSearchParams } from "react-router-dom";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [stock, setStock] = useState("");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) fetchItems();
  }, [category]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", category)
      .order("id", { ascending: false });

    if (!error) setItems(data || []);
  };

  const addItem = async () => {
    if (!itemName || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category,
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

  const deleteItem = async (id) => {
    await supabase.from("inventory").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{category?.toUpperCase()} INVENTORY</h2>

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

        <button onClick={addItem}>Add</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Action</th>
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