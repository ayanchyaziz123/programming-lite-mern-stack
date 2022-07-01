import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const RichTextField = () => {

    return (
        <div className="App">

            <CKEditor
              style={{size: '500'}}
                config={{
                    // Use the German language for this editor.
                    language: 'de',
                    // ...
                }}
                editor={ClassicEditor}
                data="<p>Write content here!!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
                
            />
        </div>
    );
}
export default RichTextField;

