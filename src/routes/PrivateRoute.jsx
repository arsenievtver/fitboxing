// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useUser();

	if (isLoading) return <div>Загрузка...</div>;
	if (!user) return <Navigate to="/" replace />;

	return children;
};

export default PrivateRoute;
