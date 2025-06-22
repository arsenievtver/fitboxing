import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import WeekCalendar from '../components/Calendar/WeekCalendar.jsx';
import EnergyBar from '../components/Charts/EnergyBar.jsx';
import VideoPlayer from '../components/Videoplayer/VideoPlayer.jsx';
import DonutDashboard from "../components/Dashboard/DonutDashboard.jsx";
import { useUser } from '../context/UserContext';

const HomePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Если нет пользователя, редиректим на старт/логин
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) {
        // Пока редирект не сработал — не показываем содержимое
        return null;
    }

    const score = user.score || 0;

    return (
        <MainLayout>
            <h2>Запишись на тренировку!</h2>
            <WeekCalendar />
            <p className="energybar-title">Твой прогресс</p>
            <EnergyBar start_bar={0} end_bar={800} count_bar={score} />
            <VideoPlayer vimeoId="1088731673" />
            <h3>Твоя предыдущая тренировка</h3>
            <DonutDashboard
                data={[
                    { value: 75, label: 'Сила', color: 'var(--primary-color-2)'},
                    { value: 68, label: 'Энергия', size: 100 }, // опционально меняешь размер
                    { value: 88, label: 'Ритм', color: 'var(--primary-color-3)' }
                ]}
            />
            <br />
            <br />
            <br />
            <br />
        </MainLayout>
    );
};

export default HomePage;
