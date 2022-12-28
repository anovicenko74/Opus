import React from 'react';
import style from './style.module.css';

function Button({ text, ...props }) {
  return (
    <button {...props} className={style.button} role="button">
      {text}
    </button>
  );
}

export default Button;
