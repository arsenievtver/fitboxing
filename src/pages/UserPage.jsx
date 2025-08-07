import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUrl, PREFIX, JWT_STORAGE_KEY, deleteBookingUrl, postAvatarMeUrl } from '../helpers/constants.js'; // добавил deleteBookingUrl
import { createApi } from '../helpers/ApiClient';
import { useUser } from '../context/UserContext';
import MainLayout from '../components/layouts/MainLayout';
import ButtonMy from '../components/Buttons/ButtonMy.jsx';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import './UserPage.css';
import UploadAvatarModal from '../components/Forms/UploadAvatarModal';


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
            onExpand();
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

const SlotRow = ({ slot, onDelete }) => (
    <div className="row booking-row">
        <span className="value">{formatDate(slot.time)}</span>
        <span className="value">{formatTime(slot.time)}</span>
        <span className="value">{(slot.type)}</span>
        <span className="trash-booking">
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
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post(PREFIX + logoutUrl);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            localStorage.removeItem(JWT_STORAGE_KEY);
            localStorage.removeItem('refresh_token_ios'); // 💥 удаляем refresh
            // Или: localStorage.clear(); — если нет других нужных данных
            setUser(null);
            navigate('/');
        }
    };


    const handleExpandBookings = () => {
        // больше ничего не делаем
    };

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

    const upcomingBookings = user.bookings.filter(booking => {
        const today = new Date();
        const slotTime = new Date(booking.slot?.time);
        return booking.is_done === false && slotTime >= today;
    }).sort((a, b) => new Date(a.slot.time) - new Date(b.slot.time));

    return (
        <MainLayout>
            <div
                className={`user-avatar-block ${user.gender === 'жен' ? 'female' : ''}`}
                onClick={() => setShowUploadModal(true)}
                style={{ cursor: 'pointer' }}
                title="Кликните, чтобы сменить фото"
            >
                <img
                    src={user.photo_url || (user.gender === 'жен' ? "/images/avatar-f-y.webp" : "/images/avatar.webp")}
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
                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map(booking => (
                            <SlotRow
                                key={booking.id}
                                slot={{ ...booking.slot, bookingId: booking.id }}
                                onDelete={handleDeleteBooking}
                            />
                        ))
                    ) : (
                        <div className="row"><span className="value">Записей пока нет</span></div>
                    )}
                </Section>

                <ButtonMy onClick={handleLogout} className="button_exit">Выйти</ButtonMy>
            </div>
            <br /><br /><br /><br />
            {showUploadModal && (
                <UploadAvatarModal
                    onClose={() => setShowUploadModal(false)}
                    onUpload={async (formData) => {
                        try {
                            await api.post(PREFIX + postAvatarMeUrl, formData);
                            await refreshUser(); // обновим user
                            setShowUploadModal(false);
                        } catch (err) {
                            console.error("Ошибка загрузки аватара", err);
                            alert("Не удалось загрузить фото.");
                        }
                    }}
                />
            )}

        </MainLayout>
    );
};

export default UserPage;