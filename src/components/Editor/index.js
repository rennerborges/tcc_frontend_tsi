import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { useTheme } from '@nextui-org/react';
import './styles.module.css';

const Editor = () => {
  const { isDark } = useTheme();
  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="json"
      theme={isDark ? 'twilight' : 'kuroir'}
      name="blah2"
      height={300}
      width="100%"
      onChange={() => {}}
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={JSON.stringify({ pessoa: 1 }, null, 1)}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default Editor;
