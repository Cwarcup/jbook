import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      // update cell context
      state.data[id].content = content; // using the immer library makes this much simpler
      return;

    case ActionType.DELETE_CELL:
      // have to delete the data and the order
      delete state.data[action.payload]; // object mutation
      state.order = state.order.filter((id) => id !== action.payload); // array mutation
      return;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1; // if direction is up, target index is one less than current index

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        // if target index is out of bounds, do nothing
        return;
      }

      // swap the order of the two cells
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return;

    case ActionType.INSERT_CELL_BEFORE:
      //generate new cell
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }

      return;

    default:
      return state;
  }
});

// randomly generate a cell id
const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
