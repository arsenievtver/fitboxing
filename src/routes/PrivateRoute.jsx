import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from '../components/IconButtons/Loading.jsx';

const PrivateRoute = ({ children }) => {
	const { user, isLoading, hasTriedLoadOnce, authError } = useUser();

	if (!hasTriedLoadOnce) {
		// Первый запуск — можно показать логотип / прелоадер
		return <Loading />;
	}

	if (authError || (!isLoading && !user)) {
		// Ошибка или неавторизован — переходим на /
		return <Navigate to="/" replace />;
	}

	return children;
};

export default PrivateRoute;
