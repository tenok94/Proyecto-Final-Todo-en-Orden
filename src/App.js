import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaTareas from "./pages/ListaTareas"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaTareas />} />
      </Routes>
    </Router>
  );
}

export default App;


