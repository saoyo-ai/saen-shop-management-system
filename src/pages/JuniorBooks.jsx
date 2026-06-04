import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function JuniorBooks() {
  const [items, setItems] = useState([]);

  const [bookName, setBookName] = useState("");
  const [grade, setGrade] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "junior_books")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setItems(data || []);
  };

  const addItem = async () => {
    if (!bookName || !grade || !stock) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        category: "junior_books",
        book_name: bookName,
        grade: grade,
        stock: Number(stock),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItems();

    setBookName("");
    setGrade("");
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
      <h1>Junior & Lower Primary Books</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />

        <input
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addItem}>
          Add Book
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Grade</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4">
                No books found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.book_name}</td>
                <td>{item.grade}</td>
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