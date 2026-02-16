import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
    return (
        <div className="app-shell">
            <Outlet />
            <BottomNav />
        </div>
    );
}
