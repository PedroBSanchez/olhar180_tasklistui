import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/header/AppHeader";
import Home from "./screens/Home";
import CreateTask from "./screens/CreateTask";
import EditTask from "./screens/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cadastro" element={<CreateTask />} />
        <Route path="/editar/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
