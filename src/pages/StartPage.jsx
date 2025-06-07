import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

import InputBase from '../components/Forms/InputBase'; // путь к компоненту скорректируй под свой проект
import ButtonMy from '../components/Buttons/ButtonMy';

const StartPage = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState(null); // null | 'login' | 'signup'

    const handleLogin = () => {
        // TODO: логика авторизации
        navigate('/home');
    };

    const handleSignup = () => {
        // TODO: логика регистрации
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
                            <InputBase placeholder="Введите телефон" />
                            <InputBase placeholder="Введите пароль" type="password" />
                            <ButtonMy onClick={handleLogin}>Войти</ButtonMy>
                            <button onClick={() => setMode(null)} className="back-button">Назад</button>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="form-container">
                            <InputBase placeholder="Введите телефон" />
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




