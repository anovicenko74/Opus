import React from 'react';

const COUNT_OF_VISIBLE_OPTIONS = 4;

function SelectWithNavigation({ isNavigation, ...props }) {
  const renderHiddenContent = () => (
    <div className={style.content}>
      {isNavigation ? (
        <Navigation
          page={page}
          pagesCount={pagesCount}
          onClickBack={() => setPage((p) => --p)}
          onClickNext={() => setPage((p) => ++p)}
        />
      ) : (
        ''
      )}
      <div className={style.options}>{visibleOptions}</div>
    </div>
  );

  if (!isNavigation) return <Select {...props} />;

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

  return <Select />;
}

export default index;
