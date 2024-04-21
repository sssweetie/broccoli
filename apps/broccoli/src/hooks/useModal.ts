import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleModal = () => setIsOpen((prevState) => !prevState);

  return { openModal, closeModal, toggleModal, isOpen };
};
