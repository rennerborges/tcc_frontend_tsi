import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import './styles.module.css';

const Editor = ({ value, onChange, readOnly }) => {
  return (
    <AceEditor
      readOnly={readOnly}
      placeholder="Placeholder Text"
      mode="json"
      theme="solarized_dark"
      height={300}
      width="100%"
      onChange={onChange}
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={JSON.stringify(value, null, 1)}
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
