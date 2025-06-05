import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FinancePage from './pages/FinancePage';
import EnergyPage from './pages/EnergyPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer.jsx';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/energy" element={<EnergyPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;

