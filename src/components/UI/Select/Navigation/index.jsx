import React from 'react';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function Navigation({
  onClickBack: handleClickBack,
  onClickNext: handleClickNext,
  page,
  pagesCount,
}) {
  return (
    <div className={style.navigation}>
      <div className={style.arrowContainer}>
        {page > 1 ? (
          <div className={style.arrow} onClick={handleClickBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={style.page}>{page}</div>
      <div className={style.arrowContainer}>
        {page < pagesCount ? (
          <div className={style.arrow} onClick={handleClickNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Navigation;
