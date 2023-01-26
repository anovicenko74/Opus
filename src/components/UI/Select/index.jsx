import React, { useEffect, useState } from 'react';
import Item from '../Item';
import Navigation from './Navigation';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';

function Select({ title, count, _renderNavigation, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const renderOptionsCount = () => {
    if (count) {
      return (
        <div className={style.count}>
          <span>{count}</span>
        </div>
      );
    }
  };

  return (
    <div className={style.select}>
      <Item
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
        text={title}
      >
        <div className={style.selectItem}>
          {renderOptionsCount()}
          <FontAwesomeIcon
            icon={isOpen ? faCircleChevronUp : faCircleChevronDown}
          />
        </div>
      </Item>
      {isOpen && (
        <div className={style.content}>
          {_renderNavigation ? _renderNavigation() : ''}
          <div className={style.options}>{props.children}</div>
        </div>
      )}
    </div>
  );
}

export default Select;
