import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalLoader, Overlay } from './Modal.styled';
import Loader from '../Loader/Loader';

function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    const handleCloseModal = (e) => {
      if (e.key === 'Escape' || e.currentTarget === e.target) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleCloseModal);
    
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalContainer>
        <img src={largeImageURL} alt="" />
        <ModalLoader format={largeImageURL}>
          <Loader />
        </ModalLoader>
      </ModalContainer>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
