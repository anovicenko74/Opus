import React, { useState, useEffect } from 'react';
import Select from '..';
import Navigation from '../Navigation';

const COUNT_OF_VISIBLE_OPTIONS = 4;

function SelectWithNavigation({ children, ...props }) {
  const _renderNavigation = () => {
    if (children.length > COUNT_OF_VISIBLE_OPTIONS)
      return (
        <Navigation
          page={page}
          pagesCount={pagesCount}
          onClickBack={() => setPage((p) => --p)}
          onClickNext={() => setPage((p) => ++p)}
        />
      );
  };

  const [visibleOptions, setVisibleOptions] = useState(
    children.slice(0, COUNT_OF_VISIBLE_OPTIONS)
  );
  const [page, setPage] = useState(1);
  const pagesCount = Math.ceil(children.length / COUNT_OF_VISIBLE_OPTIONS);
  const isNavigation = pagesCount > 1;

  useEffect(() => {
    setVisibleOptions(
      children.slice(
        COUNT_OF_VISIBLE_OPTIONS * (page - 1),
        COUNT_OF_VISIBLE_OPTIONS * page
      )
    );
  }, [page, children]);

  return (
    <Select {...props} _renderNavigation={_renderNavigation}>
      {visibleOptions}
    </Select>
  );
}

export default SelectWithNavigation;
