import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState(''); // transpiled code to show in the pre element

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
    // console.log(result);

    setCode(result.outputFiles[0].text); // set the transpiled and bundled code

    try {
      eval(result.outputFiles[0].text); // run the code
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '50%', height: '200px' }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe
        src="/test.html"
        style={{ width: '50%', height: '200px' }}
        sandbox=""
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
