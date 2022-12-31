import React from 'react';

function Option({ value, onClick: handleClick }) {
  return <div onClick={handleClick}>{value}</div>;
}

export default Option;
