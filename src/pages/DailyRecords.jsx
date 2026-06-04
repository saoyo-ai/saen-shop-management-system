import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DailyRecords() {
  const [records, setRecords] = useState([]);

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");

  const [cashIn, setCashIn] = useState("");
  const [mpesaIn, setMpesaIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [mpesaOut, setMpesaOut] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data } = await supabase
      .from("daily_records")
      .select("*")
      .eq("saved", false)
      .order("id", { ascending: false });

    setRecords(data || []);
  };

  const addRecord = async () => {
    if (!date || !item) {
      alert("Date and Item required");
      return;
    }

    const { error } = await supabase.from("daily_records").insert([
      {
        date,
        item_service: item,
        cash_in: Number(cashIn || 0),
        mpesa_in: Number(mpesaIn || 0),
        cash_out: Number(cashOut || 0),
        mpesa_out: Number(mpesaOut || 0),
        saved: false,
      },
    ]);

    if (error) return alert(error.message);

    fetchRecords();

    setItem("");
    setCashIn("");
    setMpesaIn("");
    setCashOut("");
    setMpesaOut("");
  };

  const deleteRecord = async (id) => {
    await supabase.from("daily_records").delete().eq("id", id);
    fetchRecords();
  };

  // 🔥 SAVE DAY = CLOSE SESSION
  const saveDailyRecords = async () => {
    if (!date) return alert("Select date first");

    const { error } = await supabase
      .from("daily_records")
      .update({ saved: true })
      .eq("date", date)
      .eq("saved", false);

    if (error) return alert(error.message);

    alert("Day saved successfully!");

    // 🔥 RESET UI (VERY IMPORTANT)
    setRecords([]);
    setDate("");
    setItem("");
    setCashIn("");
    setMpesaIn("");
    setCashOut("");
    setMpesaOut("");

    fetchRecords();
  };

  const totalCashIn = records.reduce((s, r) => s + Number(r.cash_in || 0), 0);
  const totalMpesaIn = records.reduce((s, r) => s + Number(r.mpesa_in || 0), 0);
  const totalCashOut = records.reduce((s, r) => s + Number(r.cash_out || 0), 0);
  const totalMpesaOut = records.reduce((s, r) => s + Number(r.mpesa_out || 0), 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Daily Records</h1>

      {/* INPUT */}
      <div style={{ marginBottom: 20 }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />

        <input placeholder="Cash In" value={cashIn} onChange={(e) => setCashIn(e.target.value)} />
        <input placeholder="M-Pesa In" value={mpesaIn} onChange={(e) => setMpesaIn(e.target.value)} />
        <input placeholder="Cash Out" value={cashOut} onChange={(e) => setCashOut(e.target.value)} />
        <input placeholder="M-Pesa Out" value={mpesaOut} onChange={(e) => setMpesaOut(e.target.value)} />

        <button onClick={addRecord}>Add</button>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10" width="100%">
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
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.item_service}</td>
              <td>{r.cash_in}</td>
              <td>{r.mpesa_in}</td>
              <td>{r.cash_out}</td>
              <td>{r.mpesa_out}</td>
              <td>
                <button onClick={() => deleteRecord(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr style={{ fontWeight: "bold" }}>
            <td>TOTALS</td>
            <td>{totalCashIn}</td>
            <td>{totalMpesaIn}</td>
            <td>{totalCashOut}</td>
            <td>{totalMpesaOut}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <br />

      <button
        onClick={saveDailyRecords}
        style={{ background: "green", color: "white", padding: 10 }}
      >
        Save Full Day Records
      </button>
    </div>
  );
}