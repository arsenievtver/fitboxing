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
import './HomePage.css';

const HomePage = () => {
    const { user, isLoading, hasTriedLoadOnce } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Навигация только если уже была попытка загрузки, загрузка закончена и пользователя нет
        if (hasTriedLoadOnce && !isLoading && !user) {
            navigate('/', { replace: true });
        }
    }, [user, isLoading, hasTriedLoadOnce, navigate]);

    // Меморизируем на основе bookings, чтобы не ломать правила хуков
    const bookings = user?.bookings || [];

    const lastTraining = useMemo(() => {
        if (bookings.length === 0) return null;

        const sorted = [...bookings]
            .filter(b => b.slot.is_done && b.slot?.time)
            .sort((a, b) => new Date(b.slot.time) - new Date(a.slot.time));

        return sorted[0] || null;
    }, [bookings]);

    const donutValues = {
        strength: lastTraining?.power ?? 0,
        energy: lastTraining?.energy ?? 0,
        tempo: lastTraining?.tempo ?? 0
    };

    const formattedDate = lastTraining?.slot?.time
        ? format(parseISO(lastTraining.slot.time), 'dd MMMM', { locale: ru })
        : null;

    // Пока первый раз не загрузили — показываем спиннер
    if (isLoading && !hasTriedLoadOnce) return <div>Загрузка...</div>;

    // Если пользователь не авторизован — PrivateRoute должен редиректить, но на всякий случай
    if (!user) return null;

    return (
        <MainLayout>
            <h3>Запишись на тренировку!</h3>
            <WeekCalendar />
            <EnergyBar start_bar={0} end_bar={user.maxPoints} count_bar={user.energy ?? 0} />
            <VideoPlayer vimeoId="1088731673" />
            <DonutDashboard values={donutValues} formattedDate={formattedDate}/>
            <br /><br /><br /><br />
        </MainLayout>
    );
};

export default HomePage;
