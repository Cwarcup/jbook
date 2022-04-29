import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
      height="50vh"
      language="javascript"
      value="// Write your code here"
      theme="dark"
    />
  );
};

export default CodeEditor;
