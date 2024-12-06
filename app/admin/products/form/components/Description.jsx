"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { 
  ssr: false 
});

export default function Description({ data, handleData }) {
  const [editorState, setEditorState] = useState(data?.description || '');
  const editorRef = useRef(null);

  // Debounced change handler to prevent performance issues
  const handleChange = useCallback((value) => {
    setEditorState(value);
    handleData('description', value);
  }, [handleData]);

  // Custom change handler to implement auto-paragraph
  const handleAutoNewParagraph = useCallback((cm) => {
    const doc = cm.getDoc();
    const cursor = doc.getCursor();
    const line = doc.getLine(cursor.line);
    
    // Define max width (adjust as needed)
    const MAX_LINE_WIDTH = 80; 

    // Check if current line exceeds max width
    if (line.length > MAX_LINE_WIDTH) {
      // Insert a new paragraph (double newline)
      doc.replaceRange('\n\n', { line: cursor.line, ch: line.length });
      
      // Move cursor to the next line
      doc.setCursor({ line: cursor.line + 1, ch: 0 });
    }
  }, []);

  // Comprehensive options with additional configuration
  const options = useCallback({
    spellChecker: false,
    maxHeight: "300px",
    autofocus: false,
    placeholder: "Enter your description here...",
    inputStyle: 'textarea', // Force textarea input style
    lineWrapping: true, // Enable line wrapping
    lineNumbers: true, // Enable line numbers
    toolbar: [
      'bold', 'italic', 'heading', '|', 
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen'
    ],
    // Additional event handlers
    extraKeys: {
      'Enter': 'newlineAndIndentContinue',
    },
    // Attach custom change handler
    onChange: (cm) => {
      handleAutoNewParagraph(cm);
    }
  }, [handleAutoNewParagraph]);

  // Effect to configure CodeMirror instance after mounting
  useEffect(() => {
    if (editorRef.current) {
      const cmInstance = editorRef.current.codemirror;
      if (cmInstance) {
        // Additional configuration can be added here
        cmInstance.on('change', handleAutoNewParagraph);
      }
    }
  }, [handleAutoNewParagraph]);

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold text-lg">Description</h1>
      <div className="custom-simplemde w-full max-w-3xl mx-auto">
        <style jsx global>{`
          .custom-simplemde .CodeMirror {
            height: auto;
            min-height: 200px;
            max-height: 400px;
            max-width: 500px;
            overflow-y: auto;
          }
          .custom-simplemde .CodeMirror-scroll {
            overflow-x: hidden !important;
            overflow-y: auto !important;
          }
          .custom-simplemde .CodeMirror-wrap {
            word-break: break-word;
            white-space: pre-wrap;
          }
          .custom-simplemde .CodeMirror-linenumbers {
            visibility: visible !important;
          }
        `}</style>
        <SimpleMDE
          ref={editorRef}
          value={editorState}
          onChange={handleChange}
          options={options}
        />
      </div>
    </section>
  );
}