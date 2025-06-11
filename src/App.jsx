import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FinancePage from './pages/FinancePage';
import EnergyPage from './pages/EnergyPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer.jsx';
import StartPage from './pages/StartPage.jsx';

const AppContent = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/start', '/'];
    const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

    return (
        <>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/energy" element={<EnergyPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/" element={<StartPage />} />
            </Routes>
            {shouldShowFooter && <Footer />}
        </>
    );
};

// ⛔️ Удаляем второй Router
const AppRouter = () => <AppContent />;

export default AppRouter;


