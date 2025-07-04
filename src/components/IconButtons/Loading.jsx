// components/Loading.jsx
import React from 'react';

const Loading = () => (
	<div style={{
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent', // фон прозрачный
	}}>
		<img
			src="/images/logo-F.png"
			alt="Loading..."
			style={{
				width: '150px', // по вкусу
				opacity: 0.5,   // полупрозрачность
				filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))', // легкая тень для четкости
				userSelect: 'none',
			}}
		/>
	</div>
);

export default Loading;
