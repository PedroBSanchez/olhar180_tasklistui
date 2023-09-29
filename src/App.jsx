import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/header/AppHeader";
import Home from "./screens/Home";
import CreateTask from "./screens/CreateTask";
import EditTask from "./screens/EditTask";
import LoginDefault from "./screens/LoginDefault";
import { verifyToken } from "./shared/verifyToken";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginDefault />} />
        <Route path="*" element={<LoginDefault />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<CreateTask />} />
        <Route path="/editar/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
