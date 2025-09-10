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
import { motion } from "framer-motion";

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

    const count_training = user?.count_trainings || 0;

    const lastTraining = useMemo(() => {
        if (!user?.bookings) return null;

        const sorted = [...user.bookings]
            .filter(b => b.slot.is_done && b.slot?.time)
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

    const cardVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.8 },
        visible: (custom) => {
            const positions = {
                left: { x: -40, rotate: -6 },
                center: { x: 0, rotate: 0 },
                right: { x: 40, rotate: 6 }
            };
            return {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    delay: custom * 0.15,
                    // 👇 сначала «разъезд», потом возвращение
                    from: positions[custom].x ? positions[custom] : { x: 0, rotate: 0 }
                }
            };
        }
    };

    return (
        <MainLayout>
            <div className="energy-container">
                {!user ? (
                    <p>Загрузка данных пользователя...</p>
                ) : (
                    <div className='container-energy-cards'>
                        <div className='status-bar'>
                            <motion.div
                                className="card-info"
                                custom="left"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <p>Проведено</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{count_training}</span>
                                <p>тренировок</p>
                            </motion.div>

                            <motion.div
                                className="card-info"
                                custom="center"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <p>Получено</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{Math.round(user.energy) ?? 0}</span>
                                <p>баллов</p>
                            </motion.div>

                            <motion.div
                                className="card-info"
                                custom="right"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <p>Достигнут</p>
                                <span style={{ color: 'var(--primary-color)', fontSize: '18px' }}>{user?.statusName}</span>
                                <p>уровень</p>
                            </motion.div>
                        </div>

                        <EnergyBar start_bar={0} end_bar={user?.maxPoints} count_bar={user.energy ?? 0} />
                        <div className='donat-bar-en'>
                            <DonutDashboard values={donutValues} formattedDate={formattedDate}/>
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
