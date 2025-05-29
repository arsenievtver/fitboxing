// App.jsx
import React from 'react';
import Header from "./components/Header";
import WeekCalendar from './components/WeekCalendar';
import EnergyBar from './components/EnergyBar';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    return (
        <div id="app-root">
            <Header />
            <div className="app-content">
                <h2>Запишись на тренировку!</h2>
                <WeekCalendar />
                <EnergyBar start_bar={0} end_bar={800} count_bar={520} />
                <VideoPlayer vimeoId="1088731673" />
            </div>
        </div>
    );
};

export default App;
