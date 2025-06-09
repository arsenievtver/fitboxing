import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

import InputBase from '../components/Forms/InputBase';
import ButtonMy from '../components/Buttons/ButtonMy';
import PhoneInput from '../components/Forms/PhoneInput';
import Modal from '../components/Modals/ModalBase';
import RadioGroup from '../components/Forms/RadioGroup';

import useApi from '../hooks/useApi.hook';
import { loginUrl, JWT_STORAGE_KEY } from '../helpers/constants';
import { UserContext } from '../context/UserContext';

const StartPage = () => {
    const navigate = useNavigate();
    const api = useApi();
    const [mode, setMode] = useState(null);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(null);
    const { refreshUser } = useContext(UserContext);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
            await refreshUser();
            navigate('/home');
        } catch (e) {
            setError(e.response?.data?.detail || 'Ошибка входа');
        }
    };

    const handleSignup = async () => {
        if (!phone || !email || !name || !lastName || !password || !confirmPassword || !gender) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Некорректный e-mail');
            return;
        }

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            const payload = {
                email,
                password,
                name,
                last_name: lastName,
                phone,
                gender
            };

            await api.post('/api/v1/auth/register', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await handleLogin(); // Авто-вход после регистрации
        } catch (e) {
            setError(e.response?.data?.detail || 'Ошибка регистрации');
        }
    };

    const closeModal = () => {
        setMode(null);
        setError(null);
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setName('');
        setLastName('');
        setGender('');
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
                    <ButtonMy onClick={() => setMode('login')}>Войти</ButtonMy>
                    <button onClick={() => setMode('signup')} className="back-button">Зарегистрироваться</button>
                </div>
            </div>

            {mode && (
                <Modal onClose={closeModal} expanded>
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
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="form-container">
                            {error && <div className="error">{error}</div>}
                            <PhoneInput value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <InputBase
                                placeholder="Введите e-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputBase
                                placeholder="Введите имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <InputBase
                                placeholder="Введите фамилию"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <RadioGroup
                                options={['муж', 'жен']}
                                value={gender}
                                onChange={setGender}
                                name="gender"
                            />
                            <InputBase
                                placeholder="Введите пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputBase
                                placeholder="Повторите пароль"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <ButtonMy onClick={handleSignup}>Зарегистрироваться</ButtonMy>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default StartPage;

