import "./App.css";
import Home from "pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Character from "pages/Character/Character";
import Ranking from "pages/Ranking/Ranking";
import Navbar from "components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
