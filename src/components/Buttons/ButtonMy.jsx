import React from 'react';
import './ButtonMy.css';

const ButtonMy = ({ children, onClick, className = '' }) => {
    return (
        <button onClick={onClick} className={`custom-button ${className}`}>
            {children}
        </button>
    );
};

export default ButtonMy;
