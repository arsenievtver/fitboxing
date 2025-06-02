import React from 'react';
import './ModalBase.css';
import CloseButton from '../IconButtons/CloseButton';

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <CloseButton onClick={onClose} />
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
