import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import DonutDashboard from '../components/DonutDashboard';
import '../styles/DonutDashboard.css'; // подключаем стили
import WeightChart from '../components/WeightChart';

const mockData = [
    { date: '01.01', weight: 78.2 },
    { date: '05.02', weight: 77.9 },
    { date: '10.03', weight: 77.4 },
    { date: '15.04', weight: 76.8 },
    { date: '20.05', weight: 76.5 },
];

const EnergyPage = () => {
    return (
        <MainLayout>
            <div className="energy-container">
                <h3 style={{ textAlign: 'center', marginLeft: 0, paddingLeft: 0 }}>
                    Твой прогресс в тренировках!
                </h3>
                <DonutDashboard />
                <WeightChart data={mockData} />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </MainLayout>
    );
};

export default EnergyPage;

