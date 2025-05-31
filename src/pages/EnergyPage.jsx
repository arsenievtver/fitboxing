import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import DonutDashboard from '../components/DonutDashboard';
import '../styles/DonutDashboard.css'; // подключаем стили

const EnergyPage = () => {
    return (
        <MainLayout>
            <div className="energy-container">
                <h3 style={{ textAlign: 'center', marginLeft: 0, paddingLeft: 0 }}>
                    Твой прогресс в тренировках!
                </h3>
                <DonutDashboard />
            </div>
        </MainLayout>
    );
};

export default EnergyPage;

