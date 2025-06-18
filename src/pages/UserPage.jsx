import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUrl, PREFIX, JWT_STORAGE_KEY, getSlotsByIdsUrl, deleteBookingUrl } from '../helpers/constants.js'; // добавил deleteBookingUrl
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

const Section = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="section">
            <div className="section-header" onClick={() => setExpanded(!expanded)}>
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
    const [userSlots, setUserSlots] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchSlots = async () => {
            if (user.bookings && user.bookings.length > 0) {
                const ids = user.bookings.map(b => b.slot_id);
                try {
                    const response = await api.get(getSlotsByIdsUrl(ids));
                    // Тут сопоставим слоты с bookingId
                    const slotsWithBookingId = response.data.map(slot => {
                        // Найдём booking по slot.id
                        const booking = user.bookings.find(b => b.slot_id === slot.id);
                        return { ...slot, bookingId: booking ? booking.id : null };
                    });
                    setUserSlots(slotsWithBookingId);
                } catch (error) {
                    console.error('Ошибка при загрузке слотов:', error);
                }
            } else {
                setUserSlots([]);
            }
        };

        fetchSlots();
    }, [user, navigate]);

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
            <div className="user-avatar-block">
                <img src="/images/avatar.webp" alt="Аватар" className="avatar-img" />
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
                    <UserRow label="Баланс тренировок:" value={user.balance_training ?? 0} />
                    <UserRow label="Статус:" value={user.status || '-'} />
                    <UserRow label="Прогресс в баллах:" value={user.score ?? 0} />
                    <UserRow label="Количество тренировок:" value={user.count_trainings ?? 0} />
                    <UserRow label="Дата создания:" value={formatDate(user.created_at)} />
                </Section>

                <Section title="Мои записи">
                    {userSlots.length > 0 ? (
                        userSlots.map((slot) => (
                            <SlotRow key={slot.id} slot={slot} onDelete={handleDeleteBooking} />
                        ))
                    ) : (
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
