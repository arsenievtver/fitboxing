import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './App';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        console.log('Есть новое обновление!');
        // Можно тут сохранить состояние, чтобы показать кнопку обновления
    },
    onOfflineReady() {
        console.log('Приложение готово к работе офлайн');
    },
});

updateSW(); // запускаем проверку обновлений

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);

