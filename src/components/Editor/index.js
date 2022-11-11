import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import './styles.module.css';
import { getJSONParseError } from '../../utils/json';

const Editor = ({ value, onChange, readOnly }) => {
  const [errors, setErrors] = useState({});

  return (
    <AceEditor
      readOnly={readOnly}
      placeholder="Placeholder Text"
      mode="json"
      theme="solarized_dark"
      height={300}
      width="100%"
      onChange={(value) => {
        onChange(value);

        const error = getJSONParseError(value);
        if (error) {
          setErrors({
            annotations: [
              {
                row: error.line - 1,
                column: error.column,
                type: 'error',
                text: `${
                  error.message
                } \nLocale error (${error.snippet.trim()})`,
              },
            ],
            markers: [
              {
                startRow: error.line - 1,
                startCol: 0,
                endRow: error.line - 1,
                endCol: 20,
                className: 'error-marker',
                type: 'background',
              },
            ],
          });
        } else if (errors.annotations) {
          setErrors({
            markers: [],
          });
        }
      }}
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      annotations={errors.annotations}
      markers={errors.markers || null}
    />
  );
};

export default Editor;
