import React from 'react';
import style from './style.module.css';
function Popup({ title, isOpen, onClose: handleClose, ...props }) {
  if (!isOpen) return;

  return (
    <div className={style.background} onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className={style.content}>
        <h1>{title}</h1>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
