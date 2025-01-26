import React, { useEffect, useRef } from 'react';

const MyIframe = ({ html, css, js,isId }) => {
    const iframeRef = useRef();
    const id=isId?"bottomiframe":""
    useEffect(() => {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const completeContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;

        iframeDoc.open();
        iframeDoc.write(completeContent);
        iframeDoc.close();
    }, [html, css, js]);

    return (
        <iframe 
            id={id}
            ref={iframeRef}
            style={{ width: '100%', height: '100%', border: 'none',display:'block' }}
            title="Live Preview"
        />
    );
};

export default MyIframe;
