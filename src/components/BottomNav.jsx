import { NavLink } from 'react-router-dom';
import { Home, Camera, Clock, User } from 'lucide-react';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/app" end className={({ isActive }) => isActive ? 'active' : ''}>
                <div className="nav-icon"><Home size={20} /></div>
                Home
            </NavLink>
            <NavLink to="/app/scan" className={({ isActive }) => `scan-btn ${isActive ? 'active' : ''}`}>
                <div className="nav-icon"><Camera size={22} /></div>
                Scan
            </NavLink>
            <NavLink to="/app/history" className={({ isActive }) => isActive ? 'active' : ''}>
                <div className="nav-icon"><Clock size={20} /></div>
                History
            </NavLink>
            <NavLink to="/app/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                <div className="nav-icon"><User size={20} /></div>
                Profile
            </NavLink>
        </nav>
    );
}
