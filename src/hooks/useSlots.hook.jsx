import { useState, useEffect, useMemo } from 'react';
import useApi from './useApi.hook';
import { getSlotsUrl } from '../helpers/constants';

export default function useSlots(startTime, endTime, open) {
	const [slots, setSlots] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const api = useApi();

	useEffect(() => {
		if (!open || !startTime || !endTime) return;

		const fetchSlots = async () => {
			try {
				setLoading(true);
				const res = await api.get(getSlotsUrl(startTime, endTime));
				setSlots(res.data);
				setError(null);
			} catch (err) {
				console.error('Ошибка при загрузке слотов:', err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchSlots();
	}, [startTime, endTime, open, api]);

	// ✅ useMemo для сортировки только при изменении слотов
	const sortedSlots = useMemo(() => {
		return [...slots].sort((a, b) => new Date(a.time) - new Date(b.time));
	}, [slots]);

	// ✅ возвращаем отсортированный массив
	return { slots: sortedSlots, loading, error };
}
