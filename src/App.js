import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast/" element={<Forecast />} />
        <Route path="/forecast/:city" element={<Forecast />} />
      </Routes>
    </Router>
  );
}

export default App;
