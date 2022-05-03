// eslint-disable-next-line
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  // const [code, setCode] = useState(''); // transpiled code to show in the pre element

  // initialize esbuild
  const startService = async () => {
    // can now refer to re.current anywhere in our component we created in ESBuild
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  // run once when the component is mounted
  useEffect(() => {
    startService();
  }, []);

  // where we are building our bundle
  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        // replace specific values in the code if found
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
