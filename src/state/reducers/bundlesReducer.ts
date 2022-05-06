import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

// interface to describe the state of the bundle reducer
interface BundlesState {
  [key: string]: {
    loading: boolean; // determines if the bundle is loading/bundling/processing
    code: string;
    err: string;
  };
}

// initialize a state object with the initial state
const initialState: BundlesState = {};

//define reducer
// recall produce() to allow is to directly mutate the state object
const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        break;
    }
  }
);

//export reduce
export default reducer;
