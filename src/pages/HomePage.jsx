// src/pages/HomePage.jsx

import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import WeekCalendar from '../components/Calendar/WeekCalendar.jsx';
import EnergyBar from '../components/Charts/EnergyBar.jsx';
import VideoPlayer from '../components/Videoplayer/VideoPlayer.jsx';
import DonutDashboard from "../components/Dashboard/DonutDashboard.jsx";
import { useUser } from '../context/UserContext'; // 👈 Подключаем хук

const HomePage = () => {
    const { user } = useUser(); // 👈 Получаем пользователя
    const score = user?.score || 0; // 👈 На случай, если пользователь еще не загружен

    return (
        <MainLayout>
            <h2>Запишись на тренировку!</h2>
            <WeekCalendar />
            <EnergyBar start_bar={0} end_bar={800} count_bar={score} />
            <VideoPlayer vimeoId="1088731673" />
            <h3>Твоя предыдущая тренировка</h3>
            <DonutDashboard />
            <br />
            <br />
            <br />
            <br />
        </MainLayout>
    );
};

export default HomePage;
