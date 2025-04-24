import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/pages/Login';
import Home from './assets/pages/Home';
import Register from './assets/pages/Register';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/benefits" element={<Benefits />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
