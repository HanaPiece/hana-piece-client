import React, { ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity",
        {
          "opacity-100 pointer-events-auto": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
