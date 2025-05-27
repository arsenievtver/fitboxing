// App.jsx
import React from 'react';
import Header from "./components/Header";
import WeekCalendar from './components/WeekCalendar';

const App = () => {
    return (
        <div id="app-root">
            <Header />
            <div className="app-content">
                <h2>Запишись на тренировку!</h2>
                <WeekCalendar />
            </div>
        </div>
    );
};

export default App;
