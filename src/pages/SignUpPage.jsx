import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleSignin = () => {
        // тут позже будет логика регистрации
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Регистрация</h2>
            <input placeholder="Email" />
            <input placeholder="Пароль" type="password" />
            <button onClick={handleSignin}>Зарегистрироваться</button>
        </div>
    );
};

export default SignUpPage;
