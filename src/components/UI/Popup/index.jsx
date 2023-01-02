import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { CSSTransition } from 'react-transition-group';

function Popup({ title, isOpen, onClose: handleClose, ...props }) {
  const popupRef = useRef();

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={popupRef}
      unmountOnExit
      timeout={250} //ms
      classNames={{
        enter: style.popupEnter,
        enterActive: style.popupEnterActive,
        exit: style.popupExit,
        exitActive: style.popupExitActive,
      }}
    >
      <div ref={popupRef} className={style.background} onClick={handleClose}>
        <div onClick={(e) => e.stopPropagation()} className={style.content}>
          <h1>{title}</h1>
          {props.children}
        </div>
      </div>
    </CSSTransition>
  );
}

export default Popup;
