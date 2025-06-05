import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FinancePage from './pages/FinancePage';
import EnergyPage from './pages/EnergyPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer.jsx';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StartPage from "./pages/StartPage.jsx";



const AppContent = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/start', '/login', '/signup', '/'];
    const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
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

const AppRouter = () => (
    <Router>
        <AppContent />
    </Router>
);

export default AppRouter;

