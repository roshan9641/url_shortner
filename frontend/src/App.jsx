import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />         {/* Dashboard */}
        <Route path="/code/:code" element={<StatsPage />} /> {/* Stats Page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
