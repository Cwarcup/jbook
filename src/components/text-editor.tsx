import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '../css/text-editor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // click outside to get preview mode
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // if click outside of the editor, get preview mode
      // if click inside of the editor, do nothing
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;