import React, { useEffect, useState } from 'react';
import Item from '../Item';
import Navigation from './Navigation';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const COUNT_OF_VISIBLE_OPTIONS = 4;

function Select({ title, count, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={style.select}
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
      >
        <Item text={title}>
          <div className={style.selectItem}>
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
      {isOpen ? props.children : ''}
    </>
  );
}

export default Select;
