import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import InputBase from "../components/Forms/InputBase.jsx";
import ButtonMy from "../components/Buttons/ButtonMy.jsx";

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
                <h2 style={{color: 'var(--primary-color)'}}>Привет</h2>
                <p>Бинты на руки и в зал!</p>
            </div>
            <div className="bottom-container">
                <div className="input">
                    <InputBase placeholder="Введите телефон" />
                    <InputBase placeholder="Введите Пароль" type="password" />
                    <ButtonMy onClick={handleLogin}> Войти </ButtonMy>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
