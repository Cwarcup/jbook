import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    // output the transpiled code stored in 'code'
    // setCode(result.outputFiles[0].text); // set the transpiled and bundled code
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      title="preview"
      ref={iframe}
      srcDoc={html}
      style={{ width: '50%', height: '200px' }}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
