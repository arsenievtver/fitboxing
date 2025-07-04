import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FinancePage from './pages/FinancePage';
import EnergyPage from './pages/EnergyPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer.jsx';
import StartPage from './pages/StartPage.jsx';
import PrivateRoute from './routes/PrivateRoute'; // ✅ добавили

const AppContent = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/start', '/'];
    const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

    return (
        <>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/home" element={
                    <PrivateRoute><HomePage /></PrivateRoute>
                } />
                <Route path="/finance" element={
                    <PrivateRoute><FinancePage /></PrivateRoute>
                } />
                <Route path="/energy" element={
                    <PrivateRoute><EnergyPage /></PrivateRoute>
                } />
                <Route path="/user" element={
                    <PrivateRoute><UserPage /></PrivateRoute>
                } />
            </Routes>
            {shouldShowFooter && <Footer />}
        </>
    );
};

const AppRouter = () => <AppContent />;

export default AppRouter;
