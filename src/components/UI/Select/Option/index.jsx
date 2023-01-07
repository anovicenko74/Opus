import React from 'react';
import Item from '../../Item';
import style from './style.module.css';
import classNames from 'classnames/bind';

function Option({ text, selected, onClick: handleClick, ...props }) {
  return (
    <div
      onClick={handleClick}
      className={classNames(style.option, { [style.active]: selected })}
    >
      <Item text={text} {...props}>
        {props.children}
      </Item>
    </div>
  );
}

export default Option;
