import React from "react";
import "./MessageModal.css";

interface MessageModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: "success" | "error" | "info";
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  type = "info",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className={`modal-header ${type}`}>
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
