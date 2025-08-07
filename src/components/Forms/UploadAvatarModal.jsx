import React, { useState, useRef } from 'react';
import Modal from '../Modals/ModalBase';
import ButtonMy from '../Buttons/ButtonMy';
import './UploadAvatarModal.css'; // создадим новый CSS


const UploadAvatarModal = ({ onClose, onUpload }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleUpload = () => {
		if (!selectedFile) return alert("Выберите фото");

		const formData = new FormData();
		formData.append("file", selectedFile); // 👈 ключ именно "file"

		onUpload(formData);
	};

	const handleChooseClick = () => {
		fileInputRef.current.click();
	};

	return (
		<Modal onClose={onClose} expanded={false}>
			<h3 style={{ textAlign: 'center' }}>Загрузить новое фото</h3>

			<div className="upload-wrapper">
				<button className="custom-button" onClick={handleChooseClick}>
					Выберите файл
				</button>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
				<div className="selected-file-name">
					{selectedFile ? selectedFile.name : 'Фото не выбрано'}
				</div>
			</div>

			<ButtonMy onClick={handleUpload} style={{ marginTop: '20px' }}>
				Загрузить
			</ButtonMy>
		</Modal>
	);
};

export default UploadAvatarModal;
