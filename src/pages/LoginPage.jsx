import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // тут позже будет логика входа
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
    };

    return (
        <div className="conteiner">
            <div className="text-bottom">
                <h2>Бинты на руки – и в зал!</h2>
            </div>
            <div className="buttons">
                <input placeholder="Email" />
                <input placeholder="Пароль" type="password" />
                <button onClick={handleLogin}>Войти</button>
            </div>
        </div>
    );
};

export default LoginPage;
