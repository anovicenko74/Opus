import Option from '@/components/UI/Select/Option';
import DragTypes from '@/DragTypes';
import withDrag from '../../../../HOC/DragHOC';

const DragOption = withDrag(Option, DragTypes.DOCUMENT_SELECT);

export default DragOption;
