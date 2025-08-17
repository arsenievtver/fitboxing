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
			// создаём bitmap c учётом EXIF
			const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

			// берём квадратную сторону
			const size = Math.min(bitmap.width, bitmap.height);

			// создаём canvas квадратного размера
			const canvas = document.createElement("canvas");
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext("2d");

			// центрируем обрезку
			const offsetX = (bitmap.width - size) / 2;
			const offsetY = (bitmap.height - size) / 2;

			ctx.drawImage(bitmap, offsetX, offsetY, size, size, 0, 0, size, size);

			// получаем превью как blob + url
			canvas.toBlob((blob) => {
				if (blob) {
					const croppedFile = new File([blob], file.name, { type: "image/jpeg" });
					setSelectedFile(croppedFile);

					const url = URL.createObjectURL(blob);
					setPreviewUrl(url);
				}
			}, "image/jpeg", 0.9);
		} catch (err) {
			console.error("Ошибка обработки изображения:", err);
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
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
