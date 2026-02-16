import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WebLayout from './components/WebLayout';
import Landing from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import UnifiedDashboard from './pages/UnifiedDashboard';
import Scan from './pages/Scan';
import History from './pages/History';
import FarmerProfile from './pages/FarmerProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/register" element={<Onboarding />} />

        {/* Unified Web App */}
        <Route path="/app" element={<WebLayout />}>
          <Route index element={<UnifiedDashboard />} />
          <Route path="scan" element={<Scan />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<FarmerProfile />} />
        </Route>

        {/* Redirect /gov to /app for unification */}
        <Route path="/gov" element={<Navigate to="/app" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
