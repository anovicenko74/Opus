import DragTypes from '@/DragTypes';
import DropSelect from '../DropSelect';
import withDrag from '../../../../HOC/DragHOC';

const DragAndDropSelect = withDrag(DropSelect, DragTypes.CATEGORY_SELECT);

export default DragAndDropSelect;
