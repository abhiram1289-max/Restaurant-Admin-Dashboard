import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {/* Simple Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <a href="/menu" style={{ marginRight: "15px" }}>Menu</a>
          <a href="/orders">Orders</a>
        </nav>

        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/menu" />} />

          {/* Pages */}
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/orders" element={<OrdersDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<h2>404 – Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
