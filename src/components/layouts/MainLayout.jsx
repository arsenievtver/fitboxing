import React from 'react';
import Header from '../Header/Header.jsx';
import '../../styles/global.css';
import PullToRefresh from 'react-pull-to-refresh';

const MainLayout = ({ children, onRefresh }) => {
    const handleRefresh = () => {
        if (onRefresh) {
            return onRefresh();
        }
        // fallback: если ничего не передали — просто ничего не делаем
        return Promise.resolve();
    };

    return (
        <div id="app-root">
            <Header />
            <PullToRefresh onRefresh={handleRefresh} className="app-content">
                {children}
            </PullToRefresh>
        </div>
    );
};

export default MainLayout;
