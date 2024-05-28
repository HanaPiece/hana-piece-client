import React from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 flex items-end justify-center transition-opacity container',
        { 'opacity-100 pointer-events-auto': isOpen, 'opacity-0 pointer-events-none': !isOpen }
      )}
      onClick={onClose}
    >
      <div
        className='bg-white p-6 shadow-top-lg rounded-t-3xl h-1/2 w-full flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <hr className='bg-gray-200 border-0 w-20 mx-auto mt-2 mb-6 h-1' />
        <div className='flex-grow overflow-auto'>
          {children}
        </div>
        <div>
          <div className='h-1 bg-gray-200 w-28 m-auto'></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;