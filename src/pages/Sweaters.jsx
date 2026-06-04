import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Sweaters() {
  const [sweaters, setSweaters] = useState([]);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stripsColor, setStripsColor] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchSweaters();
  }, []);

  const fetchSweaters = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "sweaters")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setSweaters(data || []);
  };

  const addSweater = async () => {
    if (!size || !color || !stripsColor || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category: "sweaters",
        size,
        color,
        strips_color: stripsColor,
        stock: Number(stock),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchSweaters();

    setSize("");
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

    fetchSweaters();
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

    fetchSweaters();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sweaters Inventory</h1>

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
          placeholder="Strips Color"
          value={stripsColor}
          onChange={(e) => setStripsColor(e.target.value)}
        />

        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addSweater}>
          Add Sweater
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Strips Color</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sweaters.length === 0 ? (
            <tr>
              <td colSpan="5">No sweaters found</td>
            </tr>
          ) : (
            sweaters.map((item) => (
              <tr key={item.id}>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{item.strips_color}</td>
                <td>{item.stock}</td>

                <td>
                  <button
                    onClick={() =>
                      updateStock(item.id, item.stock, -1)
                    }
                  >
                    -1
                  </button>

                  <button
                    onClick={() =>
                      updateStock(item.id, item.stock, 1)
                    }
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