import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from "./app/form";
import "./app/globals.css";

console.log("It's working");

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
  <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/main" element={<Form />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  </Router>
);