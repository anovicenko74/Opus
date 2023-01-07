import React, { useState } from 'react';
import Item from '../Item';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';

function Select({ title, count, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={style.select}
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
      >
        <Item text={title}>
          <div className={style.content}>
            {count ? (
              <div className={style.count}>
                <span>{count}</span>
              </div>
            ) : (
              ''
            )}
            <FontAwesomeIcon
              icon={isOpen ? faCircleChevronUp : faCircleChevronDown}
            />
          </div>
        </Item>
      </div>
      {isOpen ? children : ''}
    </>
  );
}

export default Select;
