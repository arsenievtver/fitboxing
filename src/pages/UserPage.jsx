import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUrl, PREFIX, JWT_STORAGE_KEY, deleteBookingUrl } from '../helpers/constants.js'; // добавил deleteBookingUrl
import { createApi } from '../helpers/ApiClient';
import { useUser } from '../context/UserContext';
import MainLayout from '../components/layouts/MainLayout';
import ButtonMy from '../components/Buttons/ButtonMy.jsx';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
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

const formatTime = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const Section = ({ title, children, onExpand }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        const next = !expanded;
        setExpanded(next);
        if (next && typeof onExpand === 'function') {
            onExpand(); // вызываем обновление при раскрытии
        }
    };

    return (
        <div className="section">
            <div className="section-header" onClick={toggleExpanded}>
                <h3>{title}</h3>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expanded && <div className="section-content">{children}</div>}
        </div>
    );
};

const UserRow = ({ label, value }) => (
    <div className="row">
        <span className="label">{label}</span>
        <span className="value">{value}</span>
    </div>
);

// Добавляем обработчик удаления и отображаем корзину
const SlotRow = ({ slot, onDelete }) => (
    <div className="row booking-row">
        <span className="value">{formatDate(slot.time)}</span>
        <span className="value">{formatTime(slot.time)}</span>
        <span className="value">{(slot.type)}</span>
        <span className="trash-booking">
            {/* корзина с курсором pointer */}
            <FaTrash
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'var(--primary-color-2)' }}
                onClick={() => onDelete(slot.bookingId)}
                title="Удалить запись"
            />
		</span>
    </div>
);

const UserPage = () => {
    const { user, setUser, refreshUser } = useUser();
    const navigate = useNavigate();
    const api = createApi(navigate);
    const [bookingRefreshTime, setBookingRefreshTime] = useState(Date.now());

    const handleLogout = async () => {
        try {
            await api.post(PREFIX + logoutUrl);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            localStorage.removeItem(JWT_STORAGE_KEY);
            setUser(null);
            navigate('/');
        }
    };

    const handleExpandBookings = async () => {
        try {
            await refreshUser();
            setBookingRefreshTime(Date.now()); // триггерим обновление UI
        } catch (error) {
            console.error('Не удалось обновить записи пользователя:', error);
        }
    };

    // Добавляем удаление с подтверждением
    const handleDeleteBooking = async (bookingId) => {
        if (!bookingId) {
            alert('Ошибка: не найден ID записи для удаления');
            return;
        }

        const confirmed = window.confirm('Вы уверены, что хотите удалить запись?');
        if (!confirmed) return;

        try {
            await api.delete(PREFIX + deleteBookingUrl(bookingId));
            await refreshUser();
        } catch (error) {
            console.error('Ошибка при удалении записи:', error);
            alert('Не удалось удалить запись. Попробуйте позже.');
        }
    };

    if (!user) return null;

    return (
        <MainLayout>
            <div className={`user-avatar-block ${user.gender === 'жен' ? 'female' : ''}`}>
                <img
                    src={user.gender === 'жен' ? "/images/avatar-f-y.webp" : "/images/avatar.webp"}
                    alt="Аватар"
                    className="avatar-img"
                />
                <div className="username">{user.name} {user.last_name}</div>
            </div>

            <div className="user_data">
                <Section title="Контактная информация">
                    <UserRow label="Телефон:" value={user.phone || '-'} />
                    <UserRow label="Email:" value={user.email || '-'} />
                </Section>

                <Section title="Личные данные">
                    <UserRow label="Имя:" value={user.name || '-'} />
                    <UserRow label="Фамилия:" value={user.last_name || '-'} />
                    <UserRow label="Пол:" value={user.gender || '-'} />
                    <UserRow label="Дата рождения:" value={formatDate(user.date_of_birth)} />
                </Section>

                <Section title="Статистика">
                    <UserRow label="Баланс тренировок:" value={user.score ?? 0} />
                    <UserRow label="Уровень:" value={user?.statusName} />
                    <UserRow label="Прогресс в баллах:" value={Math.round(user.energy) ?? 0} />
                    <UserRow label="Проведено тренировок:" value={user.count_trainings ?? 0} />
                    <UserRow label="Дата создания:" value={formatDate(user.created_at)} />
                </Section>

                <Section title="Мои записи" onExpand={handleExpandBookings}>
                    {user.bookings
                        .filter(booking => {
                            const today = new Date();
                            const slotTime = new Date(booking.slot?.time);
                            return booking.is_done === false && slotTime >= today;
                        })
                        .sort((a, b) => new Date(a.slot.time) - new Date(b.slot.time))
                        .map(booking => (
                            <SlotRow
                                key={`${booking.id}-${bookingRefreshTime}`} // ключ включает таймстамп, чтобы обновлялся
                                slot={{ ...booking.slot, bookingId: booking.id }}
                                onDelete={handleDeleteBooking}
                            />
                        ))
                    }

                    {user.bookings.filter(booking => booking.is_done === false && new Date(booking.slot?.time) >= new Date()).length === 0 && (
                        <div className="row"><span className="value">Записей пока нет</span></div>
                    )}
                </Section>

                <ButtonMy onClick={handleLogout} className="button_exit">Выйти</ButtonMy>
            </div>
            <br/><br/><br/><br/>
        </MainLayout>
    );
};

export default UserPage;
