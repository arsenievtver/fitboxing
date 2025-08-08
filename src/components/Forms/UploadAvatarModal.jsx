import React, { useState, useRef } from 'react';
import Modal from '../Modals/ModalBase';
import ButtonMy from '../Buttons/ButtonMy';
import './UploadAvatarModal.css';

const UploadAvatarModal = ({ onClose, onUpload }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			// Создаём bitmap с автоматическим учётом ориентации
			await createImageBitmap(file, { imageOrientation: "from-image" });

			// Делаем blob URL для предпросмотра
			const url = URL.createObjectURL(file);
			setSelectedFile(file);
			setPreviewUrl(url);
		} catch (err) {
			console.error("Ошибка обработки изображения:", err);
			setSelectedFile(file); // fallback без поворота
		}
	};

	const handleUpload = () => {
		if (!selectedFile) return alert("Выберите фото");

		const formData = new FormData();
		formData.append("file", selectedFile);
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

				{previewUrl && (
					<div style={{ marginTop: 10, textAlign: 'center' }}>
						<img
							src={previewUrl}
							alt="Превью"
							style={{
								maxWidth: '100%',
								maxHeight: 200,
								borderRadius: '8px',
								imageOrientation: 'from-image'
							}}
						/>
					</div>
				)}
			</div>

			<ButtonMy onClick={handleUpload} style={{ marginTop: '20px' }}>
				Загрузить
			</ButtonMy>
		</Modal>
	);
};

export default UploadAvatarModal;
