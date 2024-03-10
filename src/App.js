import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Event from "./pages/Event/Event";
import CreateEvent from "./pages/Event/CreateEvent";
// import DetailEvent from "./pages/Event/DetailEvent";
// import EditEvent from "./pages/Event/EditEvent";
import Sponsor from "./pages/Sponsor/Sponsor";
import { DashboardGuest } from './pages/DashboardGuest';
import { DashboardStaff } from './pages/DashboardStaff';
import CreateSponsor from "./pages/Sponsor/CreateSponsor";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<DashboardGuest />} />
          <Route path="/staff" element={<DashboardStaff />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/sponsor/create" element={<CreateSponsor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
