import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/header/AppHeader";
import Home from "./screens/Home";
import CreateTask from "./screens/CreateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
        </Route>
        <Route>
          <Route
            path="/cadastro"
            element={
              <>
                <CreateTask />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
