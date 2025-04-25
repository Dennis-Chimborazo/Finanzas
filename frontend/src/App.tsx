import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/pages/Login';
import Home from './assets/pages/Home';
import './index.css';
import './App.css';
import RegisterCli from './assets/pages/RegisterCli';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCli />} />
          {/* <Route path="/benefits" element={<Benefits />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
