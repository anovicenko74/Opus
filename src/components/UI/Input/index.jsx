import React from 'react';
import style from './style.module.css';

function Input({ placeholder, ...props }) {
  return (
    <div className={style.group}>
      <input {...props} className={style.input} type="text" required />
      <span className={style.highlight}></span>
      <span className={style.bar}></span>
      <label className={style.label}>{placeholder}</label>
    </div>
  );
}

export default Input;
