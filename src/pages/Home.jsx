import React from "react";
import Hero from "../components/ui/Hero";
import Login from "./Login";
function Home() {
  return (
    <div>
      <Hero />
      <Login />
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
