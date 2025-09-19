import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './App';
import { registerSW } from 'virtual:pwa-register';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserProvider } from './context/UserContext'; // 🆕 импорт провайдера

const updateSW = registerSW({
    onNeedRefresh() {
        console.log('Есть новое обновление!');
    },
    onOfflineReady() {
        console.log('Приложение готово к работе офлайн');
    },
});

updateSW();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Router>
            <UserProvider>
                <AppRouter />
            </UserProvider>
        </Router>
    </React.StrictMode>
);


