import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function DailyRecords() {
  const [records, setRecords] = useState([]);

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [cashIn, setCashIn] = useState("");
  const [mpesaIn, setMpesaIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [mpesaOut, setMpesaOut] = useState("");

  const [loadDate, setLoadDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    const { data, error } = await supabase
      .from("daily_records")
      .select("*")
      .eq("saved", false)
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setRecords(data || []);
  }

  async function addRecord() {
    if (!date || !item) {
      alert("Date and Item required");
      return;
    }

    const { error } = await supabase
      .from("daily_records")
      .insert([
        {
          date: date,
          item_service: item,
          cash_in: Number(cashIn || 0),
          mpesa_in: Number(mpesaIn || 0),
          cash_out: Number(cashOut || 0),
          mpesa_out: Number(mpesaOut || 0),
          saved: false,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    clearForm();
    await fetchRecords();
  }

  async function loadRecords() {
    if (!loadDate) {
      alert("Select a date first");
      return;
    }

    const { data, error } = await supabase
      .from("daily_records")
      .select("*")
      .eq("date", loadDate)
      .order("id", { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("No records found for " + loadDate);
      setRecords([]);
      return;
    }

    setRecords(data);
    setDate(loadDate);
  }

  function editRecord(record) {
    setEditingId(record.id);

    setDate(record.date || "");
    setItem(record.item_service || "");
    setCashIn(record.cash_in || "");
    setMpesaIn(record.mpesa_in || "");
    setCashOut(record.cash_out || "");
    setMpesaOut(record.mpesa_out || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function updateRecord() {
    if (!editingId) {
      alert("No record selected");
      return;
    }

    if (!date || !item) {
      alert("Date and Item required");
      return;
    }

    const { error } = await supabase
      .from("daily_records")
      .update({
        date: date,
        item_service: item,
        cash_in: Number(cashIn || 0),
        mpesa_in: Number(mpesaIn || 0),
        cash_out: Number(cashOut || 0),
        mpesa_out: Number(mpesaOut || 0),
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Record updated successfully.");

    setEditingId(null);
    clearForm();

    if (loadDate) {
      await loadRecords();
    } else {
      await fetchRecords();
    }
  }

  async function deleteRecord(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("daily_records")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    if (loadDate) {
      await loadRecords();
    } else {
      await fetchRecords();
    }
  }

  async function saveDailyRecords() {
    if (!date) {
      alert("Select date first");
      return;
    }

    const { data, error: checkError } = await supabase
      .from("daily_records")
      .select("id")
      .eq("date", date)
      .eq("saved", false);

    if (checkError) {
      alert(checkError.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("No unsaved records found for this date.");
      return;
    }

    const { error } = await supabase
      .from("daily_records")
      .update({ saved: true })
      .eq("date", date)
      .eq("saved", false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Day saved successfully.");

    setRecords([]);
    setDate("");
    setLoadDate("");
    setEditingId(null);

    clearForm();

    await fetchRecords();
  }

  function clearForm() {
    setItem("");
    setCashIn("");
    setMpesaIn("");
    setCashOut("");
    setMpesaOut("");
  }

  function cancelEdit() {
    setEditingId(null);
    clearForm();
  }

  const totalCashIn = records.reduce(
    (sum, record) => sum + Number(record.cash_in || 0),
    0
  );

  const totalMpesaIn = records.reduce(
    (sum, record) => sum + Number(record.mpesa_in || 0),
    0
  );

  const totalCashOut = records.reduce(
    (sum, record) => sum + Number(record.cash_out || 0),
    0
  );

  const totalMpesaOut = records.reduce(
    (sum, record) => sum + Number(record.mpesa_out || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daily Records</h1>

      <div
        style={{
          padding: "15px",
          marginBottom: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Load Previous Day</h2>

        <input
          type="date"
          value={loadDate}
          onChange={(e) => setLoadDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button onClick={loadRecords}>
          Load Records
        </button>
      </div>

      {editingId && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            background: "#fff3cd",
          }}
        >
          Editing a record. Make your corrections and click Update Record.
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cash In"
          value={cashIn}
          onChange={(e) => setCashIn(e.target.value)}
        />

        <input
          type="number"
          placeholder="M-Pesa In"
          value={mpesaIn}
          onChange={(e) => setMpesaIn(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cash Out"
          value={cashOut}
          onChange={(e) => setCashOut(e.target.value)}
        />

        <input
          type="number"
          placeholder="M-Pesa Out"
          value={mpesaOut}
          onChange={(e) => setMpesaOut(e.target.value)}
        />

        {!editingId ? (
          <button onClick={addRecord}>
            Add
          </button>
        ) : (
          <>
            <button onClick={updateRecord}>
              Update Record
            </button>

            <button onClick={cancelEdit}>
              Cancel
            </button>
          </>
        )}
      </div>

      {loadDate && (
        <p>
          Showing records for: <strong>{loadDate}</strong>
        </p>
      )}

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Cash In</th>
            <th>M-Pesa In</th>
            <th>Cash Out</th>
            <th>M-Pesa Out</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td>{record.item_service}</td>
                <td>{record.cash_in}</td>
                <td>{record.mpesa_in}</td>
                <td>{record.cash_out}</td>
                <td>{record.mpesa_out}</td>

                <td>
                  <button onClick={() => editRecord(record)}>
                    Edit
                  </button>

                  <button onClick={() => deleteRecord(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No records to display
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr style={{ fontWeight: "bold", background: "#eee" }}>
            <td>TOTALS</td>
            <td>{totalCashIn}</td>
            <td>{totalMpesaIn}</td>
            <td>{totalCashOut}</td>
            <td>{totalMpesaOut}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      {!loadDate && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={saveDailyRecords}
            style={{
              background: "green",
              color: "white",
              padding: "12px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Full Day Records
          </button>
        </div>
      )}
    </div>
  );
}

export default DailyRecords;