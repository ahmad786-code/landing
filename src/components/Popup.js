import React, { useContext } from 'react';
import './popup.css';
import { ThemeContext } from '../ThemeContext';

const Popup = ({ isOpen, onClose, children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  if (!isOpen) return null;

  return (
    <div className={`popup-overlay ${theme}`}>
      <div className={`popup-content ${theme}`}>
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
