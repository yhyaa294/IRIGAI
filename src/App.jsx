import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WebLayout from './components/WebLayout';
import Landing from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import UnifiedDashboard from './pages/UnifiedDashboard';
import Scan from './pages/Scan';
import History from './pages/History';
import FarmerProfile from './pages/FarmerProfile';
import DashboardFarmer from './pages/DashboardFarmer'; // New Component
import ScanResult from './pages/ScanResult'; // New Component
import SatelliteMap from './pages/SatelliteMap'; // New Component
import IrrigationSchedule from './pages/IrrigationSchedule'; // New Component
import WeatherPrediction from './pages/WeatherPrediction'; // New Component
import ResourceEfficiency from './pages/ResourceEfficiency'; // New Component
import RewardsLocked from './pages/RewardsLocked'; // New Component
import AuraAI from './pages/AuraAI'; // Deprecated but kept
import ReportsPage from './pages/ReportsPage'; // New Component
import RigaAI from './pages/RigaAI'; // New Component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/farmer-dashboard" element={<DashboardFarmer />} /> {/* Standalone Demo */}

        {/* Unified Web App */}
        <Route path="/app" element={<WebLayout />}>
          <Route index element={<UnifiedDashboard />} />
          <Route path="scan" element={<Scan />} />
          <Route path="scan/result" element={<ScanResult />} />
          <Route path="map" element={<SatelliteMap />} /> {/* Satellite Map */}
          <Route path="schedule" element={<IrrigationSchedule />} /> {/* Irrigation Schedule */}
          <Route path="weather" element={<WeatherPrediction />} /> {/* Weather Prediction */}
          <Route path="resources" element={<ResourceEfficiency />} /> {/* Resource Efficiency */}
          <Route path="rewards" element={<RewardsLocked />} /> {/* Pinios Rewards */}
          <Route path="reports" element={<ReportsPage />} /> {/* Reports Page */}
          <Route path="aura" element={<AuraAI />} /> {/* Legacy Aura */}
          <Route path="riga" element={<RigaAI />} /> {/* RIGA Core */}
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
