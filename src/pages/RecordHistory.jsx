import { useState } from "react";

function RecordHistory() {
  const history =
    JSON.parse(localStorage.getItem("recordHistory")) || [];

  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);

  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate();

  const startingDay = firstDay.getDay();

  const [selectedDate, setSelectedDate] = useState("");

  const formatDate = (day) => {
    const month = String(currentMonth + 1).padStart(2, "0");

    const formattedDay = String(day).padStart(2, "0");

    return `${currentYear}-${month}-${formattedDay}`;
  };

  const filteredRecords = history.filter(
    (record) => record.date === selectedDate
  );

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const calendarDays = [];

  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = formatDate(day);

    const hasRecords = history.some(
      (record) => record.date === fullDate
    );

    calendarDays.push(
      <div
        key={day}
        onClick={() => setSelectedDate(fullDate)}
        style={{
          padding: "15px",
          border: "1px solid #ccc",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor:
            selectedDate === fullDate
              ? "#4CAF50"
              : hasRecords
              ? "#dff0d8"
              : "white",
          color:
            selectedDate === fullDate ? "white" : "black",
          borderRadius: "5px",
        }}
      >
        {day}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Record History</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        {/* CALENDAR */}

        <div
          style={{
            width: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            {today.toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {weekDays.map((day) => (
              <div
                key={day}
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {day}
              </div>
            ))}

            {calendarDays}
          </div>
        </div>

        {/* TRANSACTIONS */}

        <div style={{ flex: 1 }}>
          <h2>
            {selectedDate
              ? `Transactions for ${selectedDate}`
              : "Select a date"}
          </h2>

          {selectedDate && (
            <table
              border="1"
              cellPadding="10"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr>
                  <th>Item / Service</th>
                  <th>Money In</th>
                  <th>Money Out</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.item}</td>

                      <td>{record.moneyIn}</td>

                      <td>{record.moneyOut}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No records for this date
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordHistory;