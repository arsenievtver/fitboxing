import React, { useEffect, useState } from 'react';
import './energybar.css';


const EnergyBar = ({ start_bar = 0, end_bar = 800, count_bar = 500 }) => {
    const [animatedWidth, setAnimatedWidth] = useState('100%');

    useEffect(() => {
        const rawPercentage = ((count_bar - start_bar) / (end_bar - start_bar)) * 100;
        const percentage = Math.min(100, Math.max(0, rawPercentage));
        const minWidth = 5; // минимум 5% чтобы "шарик" всегда был хоть немного виден

        const finalWidth = count_bar === 0 ? `${minWidth}%` : `${Math.max(percentage, minWidth)}%`;

        const timeout = setTimeout(() => {
            setAnimatedWidth(finalWidth);
        }, 200); // небольшая задержка, чтобы "схлопывание" было видно

        return () => clearTimeout(timeout);
    }, [start_bar, end_bar, count_bar]);

    return (
        <div className="energybar-wrapper">
            <div className='info-bar'>
                <div>
                    <p>
                        Баллов: {count_bar}
                        <span style={{ color: 'var(--primary-color)' }}>/</span>
                        {end_bar}
                    </p>
                </div>
                <div className="energybar-bar">
                    <div
                        className="energybar-fill"
                        style={{ width: animatedWidth }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default EnergyBar;


