import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Textbooks() {
  const [books, setBooks] = useState([]);

  const [bookName, setBookName] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("category", "textbooks")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setBooks(data || []);
  };

  const addBook = async () => {
    if (!bookName || !stock) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .insert([
        {
          category: "textbooks",
          book_name: bookName,
          stock: Number(stock),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchBooks();

    setBookName("");
    setStock("");
  };

  const updateStock = async (id, currentStock, change) => {
    const newStock = currentStock + change;

    if (newStock < 0) {
      alert("Stock cannot go below zero");
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({
        stock: newStock,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchBooks();
  };

  const deleteBook = async (id) => {
    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchBooks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Textbooks Inventory</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addBook}>
          Add Textbook
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="3">
                No textbooks found
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.book_name}</td>
                <td>{book.stock}</td>

                <td>
                  <button
                    onClick={() =>
                      updateStock(book.id, book.stock, -1)
                    }
                  >
                    -1
                  </button>

                  <button
                    onClick={() =>
                      updateStock(book.id, book.stock, 1)
                    }
                    style={{ marginLeft: "5px" }}
                  >
                    +1
                  </button>

                  <button
                    onClick={() => deleteBook(book.id)}
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