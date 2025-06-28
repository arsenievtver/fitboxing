import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import WeekCalendar from '../components/Calendar/WeekCalendar.jsx';
import EnergyBar from '../components/Charts/EnergyBar.jsx';
import VideoPlayer from '../components/Videoplayer/VideoPlayer.jsx';
import DonutDashboard from "../components/Dashboard/DonutDashboard.jsx";
import { useUser } from '../context/UserContext';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const HomePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const score = user?.score || 0;

    const lastTraining = useMemo(() => {
        if (!user?.bookings) return null;

        const sorted = [...user.bookings]
            .filter(b => b.is_done && b.slot?.time)
            .sort((a, b) => new Date(b.slot.time) - new Date(a.slot.time)); // по убыванию

        return sorted[0] || null;
    }, [user]);

    const donutValues = {
        strength: lastTraining?.power ?? 0,
        energy: lastTraining?.energy ?? 0,
        tempo: lastTraining?.tempo ?? 0
    };

    const formattedDate = lastTraining?.slot?.time
        ? format(parseISO(lastTraining.slot.time), 'dd MMMM', { locale: ru })
        : null;

    if (!user) return null;

    return (
        <MainLayout>
            <h3>Запишись на тренировку!</h3>
            <WeekCalendar />
            <EnergyBar start_bar={0} end_bar={user?.maxPoints} count_bar={user.energy ?? 0} />
            <VideoPlayer vimeoId="1088731673" />
            <h3>Тренировка за {formattedDate && ` ${formattedDate}`}</h3>
            <DonutDashboard values={donutValues} />
            <br />
            <br />
            <br />
            <br />
        </MainLayout>
    );
};

export default HomePage;
