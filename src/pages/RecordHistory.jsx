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
    const { data, error } = await supabase
      .from("daily_records")
      .select("*")
      .eq("saved", true)
      .order("date", { ascending: false })
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching history:", error);
      return;
    }

    setHistory(data || []);
  };

  const formatDate = (day) => {
    const month = String(currentMonth + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${currentYear}-${month}-${date}`;
  };

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const uniqueDates = [
    ...new Set(
      history.map((record) =>
        String(record.date).substring(0, 10)
      )
    ),
  ];

  const selectedRecords = history.filter(
    (record) =>
      String(record.date).substring(0, 10) === selectedDate
  );

  const totalCashIn = selectedRecords.reduce(
    (sum, record) => sum + Number(record.cash_in || 0),
    0
  );

  const totalMpesaIn = selectedRecords.reduce(
    (sum, record) => sum + Number(record.mpesa_in || 0),
    0
  );

  const totalCashOut = selectedRecords.reduce(
    (sum, record) => sum + Number(record.cash_out || 0),
    0
  );

  const totalMpesaOut = selectedRecords.reduce(
    (sum, record) => sum + Number(record.mpesa_out || 0),
    0
  );

  // DAILY CALCULATIONS
  const totalCashForDay = totalCashIn + totalMpesaIn;

  const totalExpenses = totalCashOut + totalMpesaOut;

  const mpesaDeposit = totalCashIn - totalCashOut;

  // CALENDAR
  const calendar = [];

  for (let i = 0; i < firstDayIndex; i++) {
    calendar.push(
      <div
        key={`empty-${i}`}
        style={{
          minHeight: "55px",
        }}
      ></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = formatDate(day);
    const hasData = uniqueDates.includes(fullDate);

    calendar.push(
      <button
        key={day}
        onClick={() => setSelectedDate(fullDate)}
        style={{
          minHeight: "55px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          cursor: "pointer",
          background:
            selectedDate === fullDate
              ? "#2e7d32"
              : hasData
              ? "#e8f5e9"
              : "white",
          color:
            selectedDate === fullDate
              ? "white"
              : "#222",
          fontWeight:
            hasData || selectedDate === fullDate
              ? "bold"
              : "normal",
          fontSize: "16px",
        }}
      >
        {day}

        {hasData && (
          <div
            style={{
              fontSize: "9px",
              marginTop: "2px",
              color:
                selectedDate === fullDate
                  ? "white"
                  : "#2e7d32",
            }}
          >
            ●
          </div>
        )}
      </button>
    );
  }

  // PREVIOUS MONTH
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }

    setSelectedDate("");
  };

  // NEXT MONTH
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }

    setSelectedDate("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f6",
        padding: "15px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#2e7d32",
            }}
          >
            📒 Record History
          </h1>

          <p
            style={{
              marginBottom: 0,
              color: "#666",
            }}
          >
            Select a date to view the records for that day.
          </p>
        </div>

        {/* CALENDAR */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >

          {/* MONTH NAVIGATION */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >

            <button
              onClick={previousMonth}
              style={{
                border: "none",
                background: "#eeeeee",
                padding: "10px 15px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ◀
            </button>

            <h2
              style={{
                margin: 0,
                fontSize: "21px",
              }}
            >
              {new Date(
                currentYear,
                currentMonth
              ).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </h2>

            <button
              onClick={nextMonth}
              style={{
                border: "none",
                background: "#eeeeee",
                padding: "10px 15px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ▶
            </button>

          </div>

          {/* WEEK DAYS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
              marginBottom: "5px",
            }}
          >
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#555",
                  padding: "8px 0",
                  fontSize: "14px",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* CALENDAR DAYS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {calendar}
          </div>

          <div
            style={{
              marginTop: "15px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            🟢 Green days contain saved records.
          </div>

        </div>

        {/* SELECTED DAY */}

        {selectedDate && (
          <div
            style={{
              marginTop: "20px",
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >

            {/* DAY HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#2e7d32",
                  }}
                >
                  Daily Records
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#666",
                  }}
                >
                  {selectedDate}
                </p>
              </div>

              <button
                onClick={() => setSelectedDate("")}
                style={{
                  border: "none",
                  background: "#eeeeee",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>

            </div>

            {/* NO RECORDS */}

            {selectedRecords.length === 0 ? (
              <p>No saved records for this date.</p>
            ) : (
              <>
                {/* TABLE */}

                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      minWidth: "650px",
                    }}
                  >

                    <thead>
                      <tr
                        style={{
                          background: "#2e7d32",
                          color: "white",
                        }}
                      >

                        <th
                          style={{
                            padding: "12px",
                            textAlign: "left",
                          }}
                        >
                          Item
                        </th>

                        <th style={{ padding: "12px" }}>
                          Cash In
                        </th>

                        <th style={{ padding: "12px" }}>
                          M-Pesa In
                        </th>

                        <th style={{ padding: "12px" }}>
                          Cash Out
                        </th>

                        <th style={{ padding: "12px" }}>
                          M-Pesa Out
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {selectedRecords.map((record) => (
                        <tr
                          key={record.id}
                          style={{
                            borderBottom: "1px solid #ddd",
                          }}
                        >

                          <td
                            style={{
                              padding: "12px",
                            }}
                          >
                            {record.item_service}
                          </td>

                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                            }}
                          >
                            {record.cash_in}
                          </td>

                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                            }}
                          >
                            {record.mpesa_in}
                          </td>

                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                            }}
                          >
                            {record.cash_out}
                          </td>

                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                            }}
                          >
                            {record.mpesa_out}
                          </td>

                        </tr>
                      ))}

                    </tbody>

                    {/* TOTALS */}

                    <tfoot>

                      <tr
                        style={{
                          fontWeight: "bold",
                          background: "#f1f1f1",
                        }}
                      >

                        <td style={{ padding: "12px" }}>
                          TOTALS
                        </td>

                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                          }}
                        >
                          {totalCashIn}
                        </td>

                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                          }}
                        >
                          {totalMpesaIn}
                        </td>

                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                          }}
                        >
                          {totalCashOut}
                        </td>

                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                          }}
                        >
                          {totalMpesaOut}
                        </td>

                      </tr>

                    </tfoot>

                  </table>
                </div>

                {/* DAILY SUMMARY */}

                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >

                  {/* TOTAL CASH */}

                  <div
                    style={{
                      padding: "16px",
                      background: "#e8f5e9",
                      borderRadius: "8px",
                    }}
                  >

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#555",
                      }}
                    >
                      Total Cash for Day
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "23px",
                        color: "#2e7d32",
                        marginTop: "5px",
                      }}
                    >
                      {totalCashForDay}
                    </strong>

                    <small>
                      Cash In + M-Pesa In
                    </small>

                  </div>

                  {/* EXPENSES */}

                  <div
                    style={{
                      padding: "16px",
                      background: "#fff3e0",
                      borderRadius: "8px",
                    }}
                  >

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#555",
                      }}
                    >
                      Total Expenses
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "23px",
                        color: "#e65100",
                        marginTop: "5px",
                      }}
                    >
                      {totalExpenses}
                    </strong>

                    <small>
                      Cash Out + M-Pesa Out
                    </small>

                  </div>

                  {/* MPESA DEPOSIT */}

                  <div
                    style={{
                      padding: "16px",
                      background: "#e3f2fd",
                      borderRadius: "8px",
                    }}
                  >

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#555",
                      }}
                    >
                      Amount to Deposit
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "23px",
                        color: "#1565c0",
                        marginTop: "5px",
                      }}
                    >
                      {mpesaDeposit}
                    </strong>

                    <small>
                      Cash In - Cash Out
                    </small>

                  </div>

                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}