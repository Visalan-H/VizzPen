import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import './CodeBox.css'

const CodeBox = (props) => {

  const { value, onChange, language, Name, icon, ic } = props;
  const [width, setWidth] = useState();
  const boxRef = useRef(null);
  const [light, setLight] = useState(false);


  const handleChange = (value) => {
    onChange(value);
  }

  const isLastBox = language === 'javascript';

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = boxRef.current.offsetWidth;

    const onMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      setWidth(`${newWidth}px`);
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopResize);
  };

  const handleTheme = () => {
    setLight(!light);
  }

  return (
    <div className={`codebox_main ${isLastBox ? 'no-resize' : ''}`} ref={boxRef} style={{ width: width }}>
      <div className="head">
        <div className='name-icon'>
          <i className={`fa-brands fa-${icon}`} style={{ color: ic }}></i>
          <h3>{Name.toUpperCase()}</h3>
        </div>
        <i title='toggle light/dark mode' onClick={handleTheme} className={`fa fa-${light ? 'moon' : 'sun'}`}></i>
      </div>
      <div className="body">
        <Editor
          className='editor'
          height="100%"
          language={language}
          theme={light ? 'vs' : 'vs-dark'}
          value={value}
          onChange={handleChange}
          options={{
            fontSize: 16,
            autoClosingBrackets: true,
            autoClosingQuotes: "always",
            autoClosingOvertype: "always",
            // autoIndent: "advanced",

            matchBrackets: "always",
            minimap: {
              enabled: false
            },
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontal: "auto"
            },
            overviewRulerLanes: 0,
            renderLineHighlight: "line",
            lineNumbersMinChars: 3,
            lineDecorationsWidth: 2,
            glyphMargin: false,

            bracketPairColorization: {
              enabled: true,
              independentColorPoolPerBracketType: true
            },
            quickSuggestionsFontSize: 20,
          }}
      
        />
      </div>
      {!isLastBox && <div
        className="resize-handle"
        onMouseDown={startResize}
      ></div>}

    </div>
  )
}

export default CodeBox