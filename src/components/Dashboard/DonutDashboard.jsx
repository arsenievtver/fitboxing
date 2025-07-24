import React, { useState, useEffect } from 'react';
import './DonutDashboard.css';

const Donut = ({
                   value,
                   label,
                   size = 100,
                   duration = 500,
                   color = 'var(--primary-color)',
                   maxValue = 100
               }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const percent = (animatedValue / maxValue) * 100;
    const offset = circumference * (1 - percent / 100);

    useEffect(() => {
        let start = null;

        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressValue = Math.min((progress / duration) * value, value);
            setAnimatedValue(progressValue);
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return (
        <div className="donut-wrapper" style={{ width: size, height: size + 20 }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-svg">
                <circle
                    className="donut-bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="7"
                />
                <circle
                    className="donut-ring"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="donut-center">{Math.round(animatedValue)}</div>
            <div className="donut-label">{label}</div>
        </div>
    );
};

const DonutDashboard = ({ values = {} }) => {
    const rings = [
        {
            key: 'strength',
            label: 'Сила',
            color: 'var(--primary-color-2)',
            size: 80,
            maxValue: 100
        },
        {
            key: 'energy',
            label: 'Энергия',
            color: 'var(--primary-color)',
            size: 100
        },
        {
            key: 'tempo',
            label: 'Ритм',
            color: 'var(--primary-color-3)',
            size: 80
        }
    ];

    return (
        <div className="donut-dashboard">
            {rings.map((ring, index) => (
                <Donut
                    key={index}
                    value={values[ring.key] ?? 0}
                    label={ring.label}
                    size={ring.size}
                    color={ring.color}
                    maxValue={ring.maxValue ?? 100}
                />
            ))}
        </div>
    );
};


export default DonutDashboard;
