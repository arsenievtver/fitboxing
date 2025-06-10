
import {logoutUrl, PREFIX} from "../helpers/constants.js";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { useUser } from '../context/UserContext';
import './UserPage.css';
import ButtonMy from "../components/Buttons/ButtonMy.jsx";
import { createApi } from '../helpers/ApiClient';
import { JWT_STORAGE_KEY } from '../helpers/constants';

const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const UserRow = ({ label, value }) => (
    <div className="row">
        <span className="label">{label}</span>
        <span className="value">{value}</span>
    </div>
);

const UserPage = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const api = createApi(navigate);

    useEffect(() => {
        if (!user) {
            navigate('/'); // Редирект если нет пользователя (не авторизован)
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await api.post(PREFIX+logoutUrl);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            localStorage.removeItem(JWT_STORAGE_KEY);
            setUser(null);
            navigate('/');
        }
    };

    if (!user) {
        // Пока пользователь не загрузился или редирект идёт, можно ничего не рендерить
        return null;
    }

    return (
        <MainLayout>
            <h2>Личные данные</h2>
            <div className="user_data">
                <UserRow label="Имя:" value={user.name || '-'} />
                <UserRow label="Фамилия:" value={user.last_name || '-'} />
                <UserRow label="Отчество:" value={user.father_name || '-'} />
                <UserRow label="Телефон:" value={user.phone || '-'} />
                <UserRow label="Email:" value={user.email || '-'} />
                <UserRow label="Пол:" value={user.gender || '-'} />
                <UserRow label="Дата рождения:" value={formatDate(user.date_of_birth)} />
                <UserRow label="Возраст:" value={user.age ?? '-'} />
                <UserRow label="Баланс тренировок:" value={user.balance_training ?? 0} />
                <UserRow label="Статус:" value={user.status || '-'} />
                <UserRow label="Прогресс в баллах:" value={user.score ?? 0} />
                <UserRow label="Количество тренировок:" value={user.count_trainings ?? 0} />
                <UserRow label="Дата создания:" value={formatDate(user.created_at)} />
            </div>
            <ButtonMy onClick={handleLogout} className="button_exit">Выйти</ButtonMy>
        </MainLayout>
    );
};

export default UserPage;
