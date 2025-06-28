import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import PaymentCard from '../components/Cards/PaymentCard';
import './FinancePage.css'


const paymentOptions = [
    { quantity: 8, pricePerUnit: '1250₽', totalPrice: '10 000₽', duration: 3 },
    { quantity: 4, pricePerUnit: '1500₽', totalPrice: '6 000₽', duration: 2 },
    { quantity: 1, pricePerUnit: '2000₽', totalPrice: '2 000₽', duration: 1 },
];

const FinancePage = () => {
    return (
        <MainLayout>
            <h3 style={{ marginBottom: '20px' }}>Приобретай тренировки пакетами, чтобы было выгоднее!</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {paymentOptions.map((option, index) => (
                    <PaymentCard key={index} {...option} />
                ))}
            </div>
            <a className={'footnote'}>*Период времени, в течение которого необходимо воспользоваться тренировками.</a>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </MainLayout>
    );
};

export default FinancePage;
