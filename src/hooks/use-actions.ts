import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    // is like a useState and useEffect combined. Allows us to bind out action creators one time.
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
