import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ties() {
  const [ties, setTies] = useState([]);

  const [color, setColor] = useState("");
  const [stripsColor, setStripsColor] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchTies();
  }, []);

  const fetchTies = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "ties")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setTies(data || []);
  };

  const addTie = async () => {
    if (!color || !stripsColor || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category: "ties",
        color,
        strips_color: stripsColor,
        stock: Number(stock),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchTies();

    setColor("");
    setStripsColor("");
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

    fetchTies();
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

    fetchTies();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ties Inventory</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          placeholder="Strips Color"
          value={stripsColor}
          onChange={(e) => setStripsColor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addTie}>
          Add Tie
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Color</th>
            <th>Strips Color</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ties.map((item) => (
            <tr key={item.id}>
              <td>{item.color}</td>
              <td>{item.strips_color}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}