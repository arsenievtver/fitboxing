import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { useUser } from '../context/UserContext';
import './UserPage.css';

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
    const { user } = useUser();

    if (!user) {
        return (
            <MainLayout>
                <p>Загрузка данных пользователя...</p>
            </MainLayout>
        );
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
        </MainLayout>
    );
};

export default UserPage;
