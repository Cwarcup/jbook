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
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;

    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;

    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.id); // gives us every cells id in the correct order
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
      return state;

    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      // update cell context
      state.data[id].content = content; // using the immer library makes this much simpler

      return state;

    case ActionType.DELETE_CELL:
      // have to delete the data and the order
      delete state.data[action.payload]; // object mutation
      state.order = state.order.filter((id) => id !== action.payload); // array mutation
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1; // if direction is up, target index is one less than current index

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        // if target index is out of bounds, do nothing
        return state;
      }

      // swap the order of the two cells
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;

    case ActionType.INSERT_CELL_AFTER:
      //generate new cell
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell; // add new cell to data object

      const foundIndex = state.order.findIndex(
        // find the index of the cell to insert after
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        // if the cell we want to insert after doesn't exist
        state.order.unshift(cell.id); // add the cell to the beginning of the order
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id); // insert the cell after the cell we want to insert after
      }

      return state;

    default:
      return state;
  }
}, initialState);

// randomly generate a cell id
const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
