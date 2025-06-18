import React, { useMemo } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import DonutDashboard from '../components/Dashboard/DonutDashboard.jsx';
import '../components/Dashboard/DonutDashboard.css';
import WeightChart from '../components/Charts/WeightChart.jsx';
import { useUser } from '../context/UserContext';
import { format, parseISO } from 'date-fns';

const EnergyPage = () => {
    const { user } = useUser();

    const weightData = useMemo(() => {
        if (!user?.records || user.records.length === 0) return [];

        // Берём последние 10 записей
        const lastRecords = [...user.records]
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // сортируем по дате
            .slice(-10); // берём последние 10

        return lastRecords.map(record => ({
            date: format(parseISO(record.date), 'dd.MM'), // преобразуем дату
            weight: record.weight
        }));
    }, [user]);

    return (
        <MainLayout>
            <div className="energy-container">
                <h3 style={{ textAlign: 'center', marginLeft: 0, paddingLeft: 0 }}>
                    Твой прогресс в тренировках!
                </h3>
                <DonutDashboard />
                <WeightChart data={weightData} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </MainLayout>
    );
};

export default EnergyPage;
