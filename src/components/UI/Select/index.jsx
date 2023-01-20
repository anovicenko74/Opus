import React, { useEffect, useState } from 'react';
import Item from '../Item';
import Navigation from './Navigation';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const COUNT_ITEMS = 4;

function Select({ title, count, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleContent, setVisibleContent] = useState(
    children.slice(0, COUNT_ITEMS)
  );
  const [page, setPage] = useState(1);
  const pagesCount = Math.ceil(children.length / COUNT_ITEMS);
  const withNavigation = pagesCount > 1;
  useEffect(() => {
    setVisibleContent(
      children.slice(COUNT_ITEMS * (page - 1), COUNT_ITEMS * page)
    );
  }, [page, children]);

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
      {isOpen ? (
        <div className={style.content}>
          {withNavigation ? (
            <Navigation
              page={page}
              pagesCount={pagesCount}
              onClickBack={() => setPage((p) => --p)}
              onClickNext={() => setPage((p) => ++p)}
            />
          ) : (
            ''
          )}
          <div className={style.options}>{visibleContent}</div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Select;
