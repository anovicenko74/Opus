import { useDrag } from 'react-dnd';

const withDrag = (Component, type) => {
  return ({ onDragStart, onDragEnd, item, ...props }) => {
    const [, drag] = useDrag(() => ({
      type,
      item: () => {
        if (onDragStart) onDragStart();
        return { payload: { ...item }, type };
      },
      end: () => {
        if (onDragEnd) onDragEnd();
      },
    }));

    return (
      <div ref={drag}>
        <Component {...props} />
      </div>
    );
  };
};

export default withDrag;
