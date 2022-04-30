// eslint-disable-next-line
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
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

  // where we are building our bundle
  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

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

    // output the transpiled code stored in 'code'
    // setCode(result.outputFiles[0].text); // set the transpiled and bundled code
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  // ensures the code we pass to the iframe is a script containing the code we want to run
  const html = `
    <html>
      <head>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor initialValue="const a = 1" 
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '50%', height: '200px' }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        style={{ width: '50%', height: '200px' }}
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
