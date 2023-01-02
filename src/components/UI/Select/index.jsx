import React, { useState } from 'react';
import Item from '../Item';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';

function Select({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={style.select}
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
      >
        <Item text={title}>
          <FontAwesomeIcon
            icon={isOpen ? faCircleChevronUp : faCircleChevronDown}
          />
        </Item>
      </div>
      {isOpen ? children : ''}
    </>
  );
}

export default Select;
