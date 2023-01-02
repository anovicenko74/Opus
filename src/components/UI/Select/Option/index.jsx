import React from 'react';
import Item from '../../Item';
import style from './style.module.css';
import classNames from 'classnames/bind';

function Option({ text, selected, ...props }) {
  return (
    <div className={classNames(style.option, { [style.active]: selected })}>
      <Item text={text} {...props}>
        {props.children}
      </Item>
    </div>
  );
}

export default Option;
