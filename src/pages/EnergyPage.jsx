import React, { useMemo } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import DonutDashboard from '../components/Dashboard/DonutDashboard.jsx';
import '../components/Dashboard/DonutDashboard.css';
import WeightChart from '../components/Charts/WeightChart.jsx';
import { useUser } from '../context/UserContext';
import { format, parseISO } from 'date-fns';
import EnergyBar from "../components/Charts/EnergyBar.jsx";
import './EnergyPage.css'

const EnergyPage = () => {
    const { user } = useUser();

    const weightData = useMemo(() => {
        if (!user?.records || user.records.length === 0) return [];

        const lastRecords = [...user.records]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-10);

        return lastRecords.map(record => ({
            date: format(parseISO(record.date), 'dd.MM'),
            weight: record.weight
        }));
    }, [user]);

    const score = user?.score || 0;
    const count_training = user?.count_trainings || 0;

    return (
        <MainLayout>
            <div className="energy-container">
                {!user ? (
                    <p>Загрузка данных пользователя...</p>
                ) : (
                    <div style={{ gap: '10px', display: 'grid' }}>
                        <h3>Проведено тренировок: {count_training}</h3>
                            Баллов:
                        <EnergyBar start_bar={0} end_bar={800} count_bar={score} />
                        <div className='donat-bar'>
                            <h3>Твоя последняя тренировка:</h3>
                            <DonutDashboard
                                data={[
                                    { value: 75, label: 'Сила', color: 'var(--primary-color-2)'},
                                    { value: 68, label: 'Энергия', size: 100 }, // опционально меняешь размер
                                    { value: 88, label: 'Ритм', color: 'var(--primary-color-3)' }
                                ]}
                            />
                        </div>
                        <WeightChart data={weightData} />
                        <div style={{ marginBottom: '60px' }}></div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default EnergyPage;
