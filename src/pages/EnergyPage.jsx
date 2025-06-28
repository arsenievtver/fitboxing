import React, { useMemo } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import DonutDashboard from '../components/Dashboard/DonutDashboard.jsx';
import '../components/Dashboard/DonutDashboard.css';
import WeightChart from '../components/Charts/WeightChart.jsx';
import { useUser } from '../context/UserContext';
import { format, parseISO } from 'date-fns';
import EnergyBar from "../components/Charts/EnergyBar.jsx";
import './EnergyPage.css';
import {ru} from "date-fns/locale";
import PreviousTrainings from '../components/Cards/PreviousTrainings.jsx';

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

    const lastTraining = useMemo(() => {
        if (!user?.bookings) return null;

        const sorted = [...user.bookings]
            .filter(b => b.is_done && b.slot?.time)
            .sort((a, b) => new Date(b.slot.time) - new Date(a.slot.time)); // по убыванию

        return sorted[0] || null;
    }, [user]);

    const formattedDate = lastTraining?.slot?.time
        ? format(parseISO(lastTraining.slot.time), 'dd MMMM', { locale: ru })
        : null;

    if (!user) return null;

    const donutValues = {
        strength: lastTraining?.power ?? 0,
        energy: lastTraining?.energy ?? 0,
        tempo: lastTraining?.tempo ?? 0
    };

    return (
        <MainLayout>
            <div className="energy-container">
                {!user ? (
                    <p>Загрузка данных пользователя...</p>
                ) : (
                    <div className='container-energy-cards'>
                        <div className='status-bar'>
                            <div className='card-info'>
                                <p>Проведено</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{count_training}</span>
                                <p>тренировок</p>
                            </div>
                            <div className='card-info'>
                                <p>Получено</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{Math.round(user.energy) ?? 0}</span>
                                <p>баллов</p>
                            </div>
                            <div className='card-info'>
                                <p>Достигнут</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{user?.statusName}</span>
                                <p>уровень</p>
                            </div>
                        </div>
                        <EnergyBar start_bar={0} end_bar={user?.maxPoints} count_bar={user.energy ?? 0} />
                        <div className='donat-bar'>
                            <h3>Тренировка за {formattedDate && ` ${formattedDate}`}</h3>
                            <DonutDashboard values={donutValues} />
                            <PreviousTrainings bookings={user.bookings} />
                        </div>
                        <WeightChart data={weightData} />
                        <div style={{ marginBottom: '60px' }}></div>
                    </div>
                )}
            </div>
            <br />
            <br />
        </MainLayout>
    );
};

export default EnergyPage;
