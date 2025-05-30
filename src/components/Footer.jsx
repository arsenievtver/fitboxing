import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/footer.css';

import HomeIcon from '../assets/icons/HomeIcon';
import MedalIcon from '../assets/icons/MedalIcon';
import TelegramIcon from '../assets/icons/TelegramIcon';
import UserIcon from '../assets/icons/UserIcon';
import WalletIcon from '../assets/icons/WalletIcon';

const Footer = () => {
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);

        switch (tab) {
            case 'home':
                navigate('/home');
                break;
            case 'finance':
                navigate('/finance');
                break;
            case 'lightning':
                navigate('/energy');
                break;
            case 'message':
                window.open('https://t.me/s/ias_control', '_blank');
                break;
            case 'user':
                navigate('/user');
                break;
            default:
                break;
        }
    };

    return (
        <div className="navbar-container">
            <div className={`nav-item nav-home ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleClick('home')}>
                <HomeIcon className="nav-icon" />
            </div>
            <div className={`nav-item nav-finance ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => handleClick('finance')}>
                <WalletIcon className="nav-icon" />
            </div>
            <div className={`nav-item nav-lightning ${activeTab === 'lightning' ? 'active' : ''}`} onClick={() => handleClick('lightning')}>
                <MedalIcon className="nav-icon" />
            </div>
            <div className={`nav-item nav-message ${activeTab === 'message' ? 'active' : ''}`} onClick={() => handleClick('message')}>
                <TelegramIcon className="nav-icon" />
            </div>
            <div className={`nav-item nav-user ${activeTab === 'user' ? 'active' : ''}`} onClick={() => handleClick('user')}>
                <UserIcon className="nav-icon" />
            </div>
        </div>
    );
};

export default Footer;
