import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RecordHistory() {
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("daily_records")
      .select("*")
      .eq("saved", true);

    setHistory(data || []);
  };

  const formatDate = (day) => {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const uniqueDates = [...new Set(history.map((h) => h.date))];

  const selectedRecords = history.filter(
    (r) => r.date === selectedDate
  );

  // 🔥 TOTAL CALCULATIONS (FOR SELECTED DAY)
  const totalCashIn = selectedRecords.reduce(
    (s, r) => s + Number(r.cash_in || 0),
    0
  );

  const totalMpesaIn = selectedRecords.reduce(
    (s, r) => s + Number(r.mpesa_in || 0),
    0
  );

  const totalCashOut = selectedRecords.reduce(
    (s, r) => s + Number(r.cash_out || 0),
    0
  );

  const totalMpesaOut = selectedRecords.reduce(
    (s, r) => s + Number(r.mpesa_out || 0),
    0
  );

  // 🔥 YOUR FORMULAS
  const totalCashForDay = totalCashIn + totalMpesaIn;

  const totalExpenses = totalCashOut + totalMpesaOut;

  const mpesaDeposit = totalCashIn - totalCashOut;

  const calendar = [];

  for (let i = 0; i < firstDayIndex; i++) {
    calendar.push(<div key={`e-${i}`}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = formatDate(day);
    const hasData = uniqueDates.includes(fullDate);

    calendar.push(
      <div
        key={day}
        onClick={() => setSelectedDate(fullDate)}
        style={{
          padding: 12,
          textAlign: "center",
          border: "1px solid #ccc",
          cursor: "pointer",
          backgroundColor:
            selectedDate === fullDate
              ? "#4CAF50"
              : hasData
              ? "#dff0d8"
              : "white",
          color: selectedDate === fullDate ? "white" : "black",
        }}
      >
        {day}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Record History</h1>

      {/* NAV */}
      <div style={{ marginBottom: 15 }}>
        <button onClick={() => setCurrentMonth((p) => (p === 0 ? 11 : p - 1))}>
          ◀
        </button>

        <strong style={{ margin: "0 10px" }}>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </strong>

        <button onClick={() => setCurrentMonth((p) => (p === 11 ? 0 : p + 1))}>
          ▶
        </button>
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {/* CALENDAR */}
        <div style={{ width: 400 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 5,
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} style={{ fontWeight: "bold", textAlign: "center" }}>
                {d}
              </div>
            ))}

            {calendar}
          </div>
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h3>{selectedDate || "Select a date"}</h3>

          <table border="1" cellPadding="10" width="100%">
            <thead>
              <tr>
                <th>Item</th>
                <th>Cash In</th>
                <th>M-Pesa In</th>
                <th>Cash Out</th>
                <th>M-Pesa Out</th>
              </tr>
            </thead>

            <tbody>
              {selectedRecords.length > 0 ? (
                selectedRecords.map((r) => (
                  <tr key={r.id}>
                    <td>{r.item_service}</td>
                    <td>{r.cash_in}</td>
                    <td>{r.mpesa_in}</td>
                    <td>{r.cash_out}</td>
                    <td>{r.mpesa_out}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No records for this date
                  </td>
                </tr>
              )}
            </tbody>

            {/* 🔥 FOOTER TOTALS */}
            {selectedRecords.length > 0 && (
              <tfoot>
                <tr style={{ fontWeight: "bold", background: "#f5f5f5" }}>
                  <td>TOTALS</td>
                  <td>{totalCashIn}</td>
                  <td>{totalMpesaIn}</td>
                  <td>{totalCashOut}</td>
                  <td>{totalMpesaOut}</td>
                </tr>

                <tr style={{ fontWeight: "bold", background: "#e8f5e9" }}>
                  <td>Total Cash (In + M-Pesa In)</td>
                  <td colSpan="4">{totalCashForDay}</td>
                </tr>

                <tr style={{ fontWeight: "bold", background: "#fff3e0" }}>
                  <td>Total Expenses (Out)</td>
                  <td colSpan="4">{totalExpenses}</td>
                </tr>

                <tr style={{ fontWeight: "bold", background: "#e3f2fd" }}>
                  <td>To Deposit (Cash In - Cash Out)</td>
                  <td colSpan="4">{mpesaDeposit}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}