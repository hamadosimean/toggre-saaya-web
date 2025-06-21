import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";

// components imports
import NavBar from "./partials/NavBar";
import Footer from "./partials/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./auth/Login";
import Queue from "./pages/Queue";
import Company from "./pages/Company";
import Service from "./pages/Service";
import Statistics from "./pages/Statistics";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Action from "./pages/Action";
import Display from "./pages/Display";
import Settings from "./pages/Settings";
import Register from "./auth/Register";
import ActionServiceDetailCard from "./components/ui/ActionServiceDetail";
// main app
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Company />} />
            <Route path="statistics" element={<Statistics />} />"
            <Route path="company" element={<Company />} />
            <Route path="action" element={<Action />} />
            <Route path="action/:id" element={<ActionServiceDetailCard />} />
            <Route path="display" element={<Display />} />
            <Route path="settings" element={<Settings />} />
            <Route path="service" element={<Service />} />
            <Route path="queue" element={<Queue />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
