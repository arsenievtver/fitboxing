import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div className="start-container">
            <div className="start-overlay"></div>

            <div className="start-content">
                <div className="start-top">
                    <h2 style={{color: 'var(--primary-color)'}}> Fitboxing club</h2>
                    <p>Начни прямо сейчас!</p>
                </div>

                <div className="start-bottom">
                    <button onClick={() => navigate('/login')} className="start-button">Войти</button>
                    <button onClick={() => navigate('/signup')} className="start-button" style={{ border: 'none' }}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;



