import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './components/Login'
import Index from './components/Index'
import Layout from "./components/layout/Layout";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import AddEditEmployee from "./components/AddEditEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* เส้นทางที่ต้องการการตรวจสอบสิทธิ์ */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/add-edit-emp" element={<AddEditEmployee />} />
          <Route path="/add-edit-emp/:id" element={<AddEditEmployee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Link to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
