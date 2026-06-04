import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import SchoolUniforms from "./pages/SchoolUniforms";
import InventoryPage from "./pages/InventoryPage";

import Bookshop from "./pages/Bookshop";
import Sodas from "./pages/Sodas";

import DailyRecords from "./pages/DailyRecords";
import Records from "./pages/Records";
import RecordHistory from "./pages/RecordHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* UNIFORMS */}
        <Route path="/uniforms" element={<SchoolUniforms />} />
        <Route path="/inventory" element={<InventoryPage />} />

        {/* BOOKSHOP */}
        <Route path="/bookshop" element={<Bookshop />} />

        {/* SODAS */}
        <Route path="/sodas" element={<Sodas />} />

        {/* RECORDS SYSTEM */}
        <Route path="/daily-records" element={<DailyRecords />} />
        <Route path="/records" element={<Records />} />
        <Route path="/record-history" element={<RecordHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;