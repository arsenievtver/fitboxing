// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <Routes location={location} key={location.pathname}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/finance" element={<FinancePage />} />
                        <Route path="/energy" element={<EnergyPage />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/" element={<StartPage />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>

            {shouldShowFooter && <Footer />}
        </>
    );
};

const AppRouter = () => <AppContent />;

export default AppRouter;
