import React from 'react';
import Item from '../../Item';
import style from './style.module.css';
function Option({ value, onClick: handleClick }) {
  return (
    <div onClick={handleClick} className={style.option}>
      <Item text={value} />
    </div>
  );
}

export default Option;
