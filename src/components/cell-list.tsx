import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  // order is an array of cell ids
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
