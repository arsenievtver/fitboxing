// App.jsx
import React from 'react';
import Header from "./components/Header";
import WeekCalendar from './components/WeekCalendar';
import EnergyBar from './components/EnergyBar';

const App = () => {
    return (
        <div id="app-root">
            <Header />
            <div className="app-content">
                <h2>Запишись на тренировку!</h2>
                <WeekCalendar />
                <EnergyBar start_bar={0} end_bar={800} count_bar={520} />
            </div>
        </div>
    );
};

export default App;
