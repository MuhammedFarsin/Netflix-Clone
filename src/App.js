import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { action, original } from "./url";
import "./App.css";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={original} title="Netflix Orginals" />
      <RowPost url={action} title="Action" isSmall />
    </div>
  );
}

export default App;
