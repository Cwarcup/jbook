import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState(''); // transpiled code to show in the pre element

  // initialize esbuild
  const startServer = async () => {
    // can now refer to re.current anywhere in our component we created in ESBuild
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
  };

  // run once when the component is mounted
  useEffect(() => {
    startServer();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
