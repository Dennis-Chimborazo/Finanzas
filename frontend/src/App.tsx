import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home.tsx';
import './index.css'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/benefits" element={<Benefits />} /> <- puedes agregar esta si tienes esa página */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
