import React from 'react';
import style from './style.module.css';
function Item({ text, ...props }) {
  return (
    <div {...props} className={style.item}>
      {text}
    </div>
  );
}

export default Item;
