import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  // communication between code cells
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    
    var show = (value) => {
      const root = document.querySelector('#root');
    
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
    `;

    const showFuncNoOp = 'var show = () => {};'; // show function with no operation

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          // cell we want to give real version of the show function
          cumulativeCode.push(showFunc);
        } else {
          // previous cell get no-op show function
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  }).join('\n');
};
