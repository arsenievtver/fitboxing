// src/pages/HomePage.jsx

import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import WeekCalendar from '../components/WeekCalendar';
import EnergyBar from '../components/EnergyBar';
import VideoPlayer from '../components/VideoPlayer';
import DonutDashboard from "../components/DonutDashboard.jsx";

const HomePage = () => {
    return (
        <MainLayout>
            <h2>Запишись на тренировку!</h2>
            <WeekCalendar />
            <EnergyBar start_bar={0} end_bar={800} count_bar={520} />
            <VideoPlayer vimeoId="1088731673" />
            <h3> Твоя предыдущая тренировка </h3>
            <DonutDashboard />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </MainLayout>
    );
};

export default HomePage;