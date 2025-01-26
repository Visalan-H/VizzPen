import React, { useState, useRef } from 'react'
import './CodeBox.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/material.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/mbo.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled,Editor } from 'react-codemirror2'

const CodeBox = (props) => {

  const { value, onChange, language, Name, icon, ic } = props;
  const [width, setWidth] = useState();
  const boxRef = useRef(null);


  const handleChange = (editor, data, value) => {
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

  return (
    <div className={`codebox_main ${isLastBox ? 'no-resize' : ''}`} ref={boxRef} style={{ width: width }}>
      <div className="head">
        <div className='name-icon'>
          <i className={`fa-brands fa-${icon}`} style={{ color: ic }}></i>
          <h3>{Name.toUpperCase()}</h3>
        </div>
        <i className='fa fa-cog'></i>
      </div>
      <div className="body">
        <Controlled
          onBeforeChange={handleChange}
          className='editor'
          value={value}
          options={{
            lineWrapping: true,
            theme: 'monokai',
            mode: language,
            lineNumbers: true,
            scrollbarStyle: 'null',
            matchBrackets: true,
            tabSize: 2,
            indentWithTabs: true,
            extraKeys: {
              'Ctrl-/': 'toggleComment',
              'Ctrl-Space': 'autocomplete',
            },
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