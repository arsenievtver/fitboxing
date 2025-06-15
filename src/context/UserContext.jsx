import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useMemo
} from 'react';
import { createApi } from '../helpers/ApiClient';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const api = useMemo(() => createApi(navigate), [navigate]);

	const refreshUser = useCallback(async () => {
		try {
			const { data } = await api.get('/api/v1/users/me');
			setUser(data);
		} catch (e) {
			console.warn('Не удалось загрузить пользователя', e);
			setUser(null);
		}
	}, []);

	useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	return (
		<UserContext.Provider value={{ user, setUser, refreshUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

