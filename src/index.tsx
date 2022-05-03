// eslint-disable-next-line
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <>
      <CodeCell />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// import 'bulmaswatch/superhero/bulmaswatch.min.css';
// import CodeCell from './components/code-cell';
// import { createRoot } from 'react-dom/client';

// const App = () => {
//   return (
//     <>
//       <CodeCell />
//       <CodeCell />
//     </>
//   );
// };

// const container = document.getElementById('root');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<App />);
