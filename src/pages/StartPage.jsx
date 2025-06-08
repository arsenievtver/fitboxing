import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

import InputBase from '../components/Forms/InputBase';
import ButtonMy from '../components/Buttons/ButtonMy';
import PhoneInput from '../components/Forms/PhoneInput';

import useApi from '../hooks/useApi.hook';
import { loginUrl, JWT_STORAGE_KEY } from '../helpers/constants';
import { UserContext } from '../context/UserContext'; // <==

const StartPage = () => {
    const navigate = useNavigate();
    const api = useApi();
    const [mode, setMode] = useState(null);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { refreshUser } = useContext(UserContext); // <==

    const handleLogin = async () => {
        try {
            const params = new URLSearchParams();
            params.append('username', phone);
            params.append('password', password);

            const { data } = await api.post(loginUrl, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            localStorage.setItem(JWT_STORAGE_KEY, data.access_token);

            await refreshUser(); // ⬅ Загрузим пользователя сразу после логина

            navigate('/home');
        } catch (e) {
            setError(e.response?.data?.detail || 'Ошибка входа');
        }
    };

    const handleSignup = () => {
        // Пока заглушка
        navigate('/home');
    };

    return (
        <div className="start-container">
            <div className="start-overlay"></div>

            <div className="start-content">
                <div className="start-top">
                    <h2 style={{ color: 'var(--primary-color)' }}>Fitboxing club</h2>
                    <p>Начни прямо сейчас!</p>
                </div>

                <div className="start-bottom">
                    {!mode && (
                        <>
                            <ButtonMy onClick={() => setMode('login')}>Войти</ButtonMy>
                            <button onClick={() => setMode('signup')} className="back-button">Зарегистрироваться</button>
                        </>
                    )}

                    {mode === 'login' && (
                        <div className="form-container">
                            {error && <div className="error">{error}</div>}
                            <PhoneInput value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <InputBase
                                placeholder="Введите пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ButtonMy onClick={handleLogin}>Войти</ButtonMy>
                            <button onClick={() => setMode(null)} className="back-button">Назад</button>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="form-container">
                            <PhoneInput value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <InputBase placeholder="Введите имя" />
                            <InputBase placeholder="Введите пароль" type="password" />
                            <InputBase placeholder="Повторите пароль" type="password" />
                            <ButtonMy onClick={handleSignup}>Зарегистрироваться</ButtonMy>
                            <button onClick={() => setMode(null)} className="back-button">Назад</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StartPage;