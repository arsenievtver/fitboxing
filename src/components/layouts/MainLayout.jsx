// src/components/layouts/MainLayout.jsx

import React from 'react';
import Header from '../Header';

const MainLayout = ({ children }) => {
    return (
        <div id="app-root">
            <Header />
            <div className="app-content">{children}</div>
        </div>
    );
};

export default MainLayout;