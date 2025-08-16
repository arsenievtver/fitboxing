import React, { useEffect, useState, useContext } from 'react';
import Modal from './ModalBase';
import useApi from '../../hooks/useApi.hook';
import { PostGetSlotResultsUrl } from '../../helpers/constants';
import { UserContext } from '../../context/UserContext';
import { PHOTO_BASE_URL } from '../../helpers/constants';
import './TrainingResultsModal.css';

const TrainingResultsModal = ({ slotId, onClose }) => {
	const api = useApi();
	const { user } = useContext(UserContext);
	const currentUserId = user?.id;

	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!slotId) return;

		setLoading(true);
		api.post(PostGetSlotResultsUrl(slotId))
			.then(res => {
				if (Array.isArray(res.data)) {
					const sorted = [...res.data].sort((a, b) => b.energy - a.energy);
					setResults(sorted);
				}
			})
			.finally(() => setLoading(false));
	}, [slotId]);

	return (
		<Modal isOpen={true} onClose={onClose} className="results-modal-window">
			<div className="results-modal">
				<h3>Рейтинг тренировки</h3>
				{loading ? (
					<div>Загрузка...</div>
				) : results.length > 0 ? (
					<div className="results-list">
						{results.map((r, idx) => (
							<div
								key={r.id}
								className={`result-row ${r.id === currentUserId ? 'highlight' : ''}`}
							>
								<span className="place-rat">{idx + 1}.</span>
								<div className="avatar-rat">
									{r.photo_url ? (
										<img src={`${PHOTO_BASE_URL}${r.photo_url}`} alt={r.name} />
									) : (
										<div style={{ background: '#ccc', width: '100%', height: '100%' }} />
									)}
								</div>
								<span className="name-rat">{r.name} </span>
								<span className="energy-rat">  ⚡️{Math.round(r.energy)}</span>
							</div>
						))}
					</div>
				) : (
					<div>Нет данных</div>
				)}
			</div>
		</Modal>
	);
};

export default TrainingResultsModal;
