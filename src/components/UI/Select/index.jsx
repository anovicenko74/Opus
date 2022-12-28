import React, { useState } from 'react';
import Item from '../Item';
import style from './style.module.css';
function Select({ title, children  }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={style.select}
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
      >
        <Item text={title} />
      </div>
      {isOpen ? children : ''}
    </>
  );
}

export default Select;
