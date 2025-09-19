import React, { useState, useEffect } from 'react';
import './DonutDashboard.css';

const Donut = ({
                   value,
                   label,
                   size = 100,
                   duration = 500,
                   color = 'var(--primary-color)',
                   maxValue = 100,
                   isEmpty = false // добавлено
               }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const percent = (animatedValue / maxValue) * 100;
    const offset = circumference * (1 - percent / 100);

    useEffect(() => {
        if (isEmpty) return; // добавлено (не анимируем)
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
    }, [value, duration, isEmpty]); // добавлено isEmpty

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
                    stroke={isEmpty ? 'rgba(255,255,255,0.1)' : color} // добавлено
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={isEmpty ? 0 : offset} // добавлено
                    strokeLinecap="round"
                />
            </svg>
            <div className="donut-center">{isEmpty ? <span style={{ color }}>{'?'}</span> : Math.round(animatedValue)}</div> {/* добавлено */}
            <div className="donut-label">{label}</div>
        </div>
    );
};


const DonutDashboard = ({ values = {}, formattedDate }) => {
    const rings = [
        { key: 'strength', label: 'Сила', color: 'var(--primary-color-2)', size: 80, maxValue: 100 },
        { key: 'energy', label: 'Энергия', color: 'var(--primary-color)', size: 100 },
        { key: 'tempo', label: 'Ритм', color: 'var(--primary-color-3)', size: 80 }
    ];

    const hasData = Object.values(values).some(v => v > 0); // добавлено

    return (
        <div className="donut-dashboard-wrapper">
            {formattedDate && hasData && (
                <h3 className="donut-title">Тренировка за {formattedDate}</h3>
            )}
            {!hasData && (
                <div className="donut-empty-text">
                    Проведи тренировку, чтобы увидеть свои результаты
                </div>
            )}
            <div className="donut-dashboard">
                {rings.map((ring, index) => (
                    <Donut
                        key={index}
                        value={values[ring.key] ?? 0}
                        label={ring.label}
                        size={ring.size}
                        color={ring.color}
                        maxValue={ring.maxValue ?? 100}
                        isEmpty={!hasData} // добавлено
                    />
                ))}
            </div>
        </div>
    );
};



export default DonutDashboard;
