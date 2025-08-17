import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaChevronRight } from 'react-icons/fa';
import '../../pages/UserPage.css';
import TrainingResultsModal from '../Modals/TrainingResultsModal';
import './PreviousTrainings.css'

const TrainingRow = ({ power, energy, tempo, date, onClick }) => (
	<div className="row booking-row" onClick={onClick} style={{ cursor: 'pointer' }}>
		<span className="value">{date}</span>
		<span className="value"><span style={{ color: 'var(--primary-color-2)' }}>{power}</span></span>
		<span className="value"><span style={{ color: 'var(--primary-color)' }}>{Math.round(energy)}</span></span>
		<span className="value"><span style={{ color: 'var(--primary-color-3)' }}>{Math.round(tempo)}</span></span>
		<FaChevronRight color="var(--primary-color)" size={10} />
	</div>
);

const formatShortDate = (dateStr) => {
	if (!dateStr) return '-';
	const date = new Date(dateStr);
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yy = String(date.getFullYear()).slice(-2);
	return `${dd}.${mm}.${yy}`;
};

const PreviousTrainings = ({ bookings = [] }) => {
	const [expanded, setExpanded] = useState(false);
	const [selectedSlotId, setSelectedSlotId] = useState(null);

	const toggleExpanded = () => setExpanded(prev => !prev);

	const doneBookings = bookings
		.filter(b => b.is_done)
		.sort((a, b) => new Date(b.slot?.time) - new Date(a.slot?.time))
		.slice(0, 5);

	return (
		<div className="section">
			<div className="section-header" onClick={toggleExpanded}>
				<h3 style={{ margin: 0 }}>Предыдущие тренировки</h3>
				{expanded ? <FaChevronUp color="var(--primary-color)"/> : <FaChevronDown color="var(--primary-color)"/>}
			</div>

			{expanded && (
				<div className="section-content">
					{doneBookings.length > 0 ? (
						doneBookings.map((b, i) => (
							<TrainingRow
								key={b.id || i}
								date={formatShortDate(b.slot?.time)}
								power={b.power ?? '-'}
								energy={b.energy ?? '-'}
								tempo={b.tempo ?? '-'}
								onClick={() => setSelectedSlotId(b.slot?.id)}
							/>
						))
					) : (
						<div className="row"><span className="value">Нет завершённых тренировок</span></div>
					)}
				</div>
			)}

			{selectedSlotId && (
				<TrainingResultsModal
					slotId={selectedSlotId}
					onClose={() => setSelectedSlotId(null)}
				/>
			)}
		</div>
	);
};

export default PreviousTrainings;
