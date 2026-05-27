import { useState } from "react";

function DailyRecords() {
  const [records, setRecords] = useState([]);

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [moneyIn, setMoneyIn] = useState("");
  const [moneyOut, setMoneyOut] = useState("");

  const addRecord = () => {
    if (!date || !item) {
      alert("Please enter date and item");
      return;
    }

    const newRecord = {
      date,
      item,
      moneyIn,
      moneyOut,
    };

    setRecords([...records, newRecord]);

    setItem("");
    setMoneyIn("");
    setMoneyOut("");
  };

  const saveFullDay = () => {
    if (records.length === 0) {
      alert("No records to save");
      return;
    }

    const existingHistory =
      JSON.parse(localStorage.getItem("recordHistory")) || [];

    const updatedHistory = [...existingHistory, ...records];

    localStorage.setItem(
      "recordHistory",
      JSON.stringify(updatedHistory)
    );

    alert("Full day records saved");

    setRecords([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daily Records</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Add Transaction</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Item or Service"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Money In"
          value={moneyIn}
          onChange={(e) => setMoneyIn(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Money Out"
          value={moneyOut}
          onChange={(e) => setMoneyOut(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addRecord} style={buttonStyle}>
          Add Record
        </button>
      </div>

      <h2>Today's Records</h2>

      <table
        border="1"
        cellPadding="10"
        style={tableStyle}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Item / Service</th>
            <th>Money In</th>
            <th>Money Out</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.item}</td>
              <td>{record.moneyIn}</td>
              <td>{record.moneyOut}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "30px" }}>
        <button onClick={saveFullDay} style={saveDayButtonStyle}>
          Save Full Day Records
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};

const saveDayButtonStyle = {
  padding: "15px 30px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
};

export default DailyRecords;