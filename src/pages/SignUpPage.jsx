import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputBase from "../components/Forms/InputBase.jsx";
import ButtonMy from "../components/Buttons/ButtonMy.jsx";
import './SignUpPage.css'; // убедись, что ты подключаешь CSS

const SignUpPage = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
    };

    return (
        <div className="box-content-signup">
            <div className="text-wrapper">
                <h2>Привет</h2>
                <p>Добро пожаловать в команду</p>
            </div>
            <div className="form-wrapper">
                <InputBase placeholder="Введите телефон" />
                <InputBase placeholder="Введите имя" />
                <InputBase placeholder="Введите Пароль" type="password" />
                <InputBase placeholder="Повторите пароль" type="password" />
                <ButtonMy onClick={handleSignup}>Зарегистрироваться</ButtonMy>
            </div>
        </div>
    );
};

export default SignUpPage;

