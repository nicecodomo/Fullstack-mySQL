import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Login from './components/Login'
import Index from './components/Index'
import Layout from "./components/layout/Layout";
import AddEditUser from "./components/AddEditUser";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* เส้นทางที่ต้องการการตรวจสอบสิทธิ์ */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/add-edit-user" element={<AddEditUser />} />
          <Route path="/add-edit-user/:id" element={<AddEditUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Link to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
