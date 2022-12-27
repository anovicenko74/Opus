import React, { useState } from 'react';

function Select({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}>
        {title}
      </div>
      {isOpen ? children : ''}
    </>
  );
}

export default Select;
