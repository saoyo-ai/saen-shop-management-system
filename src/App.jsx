import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import SchoolUniforms from "./pages/SchoolUniforms";
import Bookshop from "./pages/Bookshop";
import Sodas from "./pages/Sodas";

import Sweaters from "./pages/Sweaters";
import Trousers from "./pages/Trousers";
import Shirts from "./pages/Shirts";
import Skirts from "./pages/Skirts";
import Ties from "./pages/Ties";
import Tracksuits from "./pages/Tracksuits";

import Socks from "./pages/Socks";
import GirlsSocks from "./pages/GirlsSocks";
import BoysSocks from "./pages/BoysSocks";
import SportsSocks from "./pages/SportsSocks";

import ExerciseBooks from "./pages/ExerciseBooks";
import Setbooks from "./pages/Setbooks";
import Textbooks from "./pages/Textbooks";
import JuniorBooks from "./pages/JuniorBooks";
import OtherStationaries from "./pages/OtherStationaries";

import Records from "./pages/Records";
import DailyRecords from "./pages/DailyRecords";
import RecordHistory from "./pages/RecordHistory";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Main Categories */}
      <Route
        path="/uniforms"
        element={<SchoolUniforms />}
      />

      <Route
        path="/bookshop"
        element={<Bookshop />}
      />

      <Route
        path="/sodas"
        element={<Sodas />}
      />

      {/* Uniforms */}
      <Route
        path="/sweaters"
        element={<Sweaters />}
      />

      <Route
        path="/trousers"
        element={<Trousers />}
      />

      <Route
        path="/shirts"
        element={<Shirts />}
      />

      <Route
        path="/skirts"
        element={<Skirts />}
      />

      <Route
        path="/ties"
        element={<Ties />}
      />

      <Route
        path="/tracksuits"
        element={<Tracksuits />}
      />

      {/* Socks */}
      <Route
        path="/socks"
        element={<Socks />}
      />

      <Route
        path="/girls-socks"
        element={<GirlsSocks />}
      />

      <Route
        path="/boys-socks"
        element={<BoysSocks />}
      />

      <Route
        path="/sports-socks"
        element={<SportsSocks />}
      />

      {/* Bookshop */}
      <Route
        path="/exercise-books"
        element={<ExerciseBooks />}
      />

      <Route
        path="/setbooks"
        element={<Setbooks />}
      />

      <Route
        path="/textbooks"
        element={<Textbooks />}
      />

      <Route
        path="/junior-books"
        element={<JuniorBooks />}
      />

      <Route
        path="/other-stationaries"
        element={<OtherStationaries />}
      />

      {/* Records */}
      <Route
        path="/records"
        element={<Records />}
      />

      <Route
        path="/daily-records"
        element={<DailyRecords />}
      />

      <Route
        path="/record-history"
        element={<RecordHistory />}
      />
    </Routes>
  );
}

export default App;