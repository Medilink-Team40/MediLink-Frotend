import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/page/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;