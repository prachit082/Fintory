import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SignUpSignIn from './pages/SignUp';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App
