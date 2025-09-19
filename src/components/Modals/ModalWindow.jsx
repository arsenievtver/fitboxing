import * as React from 'react';
import dayjs from 'dayjs';
import CloseButton from '../IconButtons/CloseButton.jsx';
import './modal_calendar.css';
import useSlots from '../../hooks/useSlots.hook';
import useApi from '../../hooks/useApi.hook';
import { postBookingUrl } from '../../helpers/constants';

// ✅ импортируем useUser
import { useUser } from '../../context/UserContext';

const ModalWindow = ({ activeDay, closeModal }) => {
    const [selectedSlot, setSelectedSlot] = React.useState(null);
    const api = useApi();

    // ✅ получаем refreshUser из контекста
    const { user, refreshUser } = useUser();

    // Формируем диапазон времени
    const isValidDay = activeDay && dayjs.isDayjs(activeDay);
    const startTime = isValidDay ? activeDay.startOf('day').toISOString() : null;
    const endTime = isValidDay ? activeDay.endOf('day').toISOString() : null;

    // Подключаем хук для получения слотов
    const { slots, loading, error } = useSlots(startTime, endTime, !!activeDay);

    const toggleSlot = (slot) => {
        setSelectedSlot(selectedSlot?.id === slot.id ? null : slot);
    };

    const handleBooking = async (slot) => {
        try {
            const response = await api.post(postBookingUrl, {
                created_at: new Date().toISOString(),
                slot_id: slot.id,
                source_record: 'через приложение'
            });

            if (response.status === 201) {
                alert('✅ Вы успешно записаны!');
                await refreshUser(); // обновляем данные пользователя

                // ⚡️ если у пользователя есть telegram_id → отправляем сообщение
                if (user?.telegram_id) {
                    const dateStr = dayjs(slot.time).format("DD.MM.YY");
                    const timeStr = dayjs(slot.time).format("HH:mm");
                    await sendTelegramMessage(user.telegram_id, dateStr, timeStr);
                }

                closeModal();
                setSelectedSlot(null);
            }
        } catch (error) {
            if (error?.response?.status === 400 && error.response.data?.detail?.includes('Already exist')) {
                alert('⚠️ Вы уже записаны на это время.');
            } else {
                console.error('Ошибка при записи:', error);
                alert('❌ Произошла ошибка. Попробуйте позже.');
            }
        }
    };

    const sendTelegramMessage = async (telegramId, date, time) => {
        const BOT_TOKEN = "7728171720:AAGyOYHnvnwScbctXvaYu2p45rKQRU_T_Ik";
        const message = `✅ Вы успешно записаны на тренировку! \nЖдем Вас ${date} в ${time} 🥊\n
<i>Чтобы отменить запись — зайдите в приложении во вкладку "Пользователь (👤)" → "Мои Записи"</i>`;


        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: telegramId,
                    text: message,
                    parse_mode: "HTML"
                })
            });
        } catch (err) {
            console.error("Ошибка при отправке сообщения в Telegram:", err);
        }
    };


    return (
        <div className="modal-window-bottom">
            <CloseButton onClick={closeModal} />
            {isValidDay ? (
                <p className="modal-date-label">
                    Запись на {activeDay.format('DD.MM.YY')} - {activeDay.format('dddd')}
                </p>
            ) : (
                <p className="modal-date-label">Нет выбранной даты.</p>
            )}

            <div className="modal-slots">
                {loading ? (
                    <p>Загрузка доступных слотов...</p>
                ) : error ? (
                    <p>Ошибка загрузки слотов.</p>
                ) : slots.length > 0 ? (
                    <ul>
                        {slots.map((slot) => (
                            <li key={slot.id} className="slot-item" onClick={() => toggleSlot(slot)}>
                                <div className="slot-main">
                                    <span className="slot-time">{dayjs(slot.time).format('HH:mm')}</span>
                                    <span className="slot-type">{slot.type}</span>
                                    <span className="slot-free">{slot.free_places}</span>
                                </div>
                                {selectedSlot?.id === slot.id && (
                                    <div className="slot-expanded">
                                        <span>{activeDay.format('DD.MM.YY')} {activeDay.format('dddd')}</span>
                                        <button onClick={(e) => { e.stopPropagation(); handleBooking(slot); }}>
                                            Записаться
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет доступных слотов на этот день.</p>
                )}
            </div>
        </div>
    );
};

export default ModalWindow;
