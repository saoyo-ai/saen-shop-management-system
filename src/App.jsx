import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RecordHistory from "./pages/RecordHistory";
import DailyRecords from "./pages/DailyRecords";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC DASHBOARD */}
        <Route path="/" element={<Dashboard />} />

        {/* PUBLIC RECORD HISTORY */}
        <Route
          path="/record-history"
          element={<RecordHistory />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* PRIVATE DAILY RECORDS */}
        <Route
          path="/daily-records"
          element={
            <ProtectedRoute>
              <DailyRecords />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;