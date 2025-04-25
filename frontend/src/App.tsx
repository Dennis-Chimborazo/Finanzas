import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoalsProvider } from "./assets/context/GoalsContext";
import Login from './assets/pages/Login';
import Home from './assets/pages/Home';
import Dashboard from './assets/pages/Dashboard';
import Goals from './assets/pages/Goals';
import Contributions from './assets/pages/Contributions';
import Suggestions from './assets/pages/Suggestions';
import Reports from './assets/pages/Reports';
import RegisterCli from './assets/pages/RegisterCli';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>

      <GoalsProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterCli />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/goals" element={<Goals />} />
            <Route path="/dashboard/contributions" element={<Contributions />} />
            <Route path="/dashboard/suggestions" element={<Suggestions />} />
            <Route path="/dashboard/reports" element={<Reports />} />
          </Routes>
        </div>
      </GoalsProvider>
    </Router>
  );
}

export default App;
