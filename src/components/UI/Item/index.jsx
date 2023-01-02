import React from 'react';
import style from './style.module.css';
function Item({ text, children, ...props }) {
  return (
    <div {...props} className={style.item}>
      <div className={style.text}>{text}</div>
      <div className={style.children}>{children}</div>
    </div>
  );
}

export default Item;
