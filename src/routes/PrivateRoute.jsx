import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from '../components/IconButtons/Loading.jsx';

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useUser();

	if (isLoading) return <Loading />;
	if (!user) return <Navigate to="/" replace />;

	return children;
};

export default PrivateRoute;
