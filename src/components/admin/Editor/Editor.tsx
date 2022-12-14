import React, { useEffect, useState, useRef } from "react";

function Editor({ onChange, name, htmlData  }: any) {
  const editorRef: any = useRef();
  const { CKEditor, EditorBuild } = editorRef.current || {};
  const [editor, setEditor] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      EditorBuild: require("ckeditor5-custom-build/build/ckeditor"),
    };
    setEditorLoaded(true);
  }, []);

  // const editorConfiguration = {
  //   toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'mediaEmbed' ],
  //       heading: {
  //           options: [
  //               { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
  //               { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
  //               { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
  //           ]
  //       },
  //       items: [
  //         'heading', '|',
  //         'fontfamily', 'fontsize', '|',
  //         'alignment', '|',
  //         'fontColor', 'fontBackgroundColor', '|',
  //         'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
  //         'link', '|',
  //         'outdent', 'indent', '|',
  //         'bulletedList', 'numberedList', 'todoList', '|',
  //         'code', 'codeBlock', '|',
  //         'insertTable', '|',
  //         'uploadImage', 'blockQuote', '|',
  //         'undo', 'redo'
  //     ],
  //     shouldNotGroupWhenFull: true
  // };
  
  return (
    <div>
      {editorLoaded ? (
        <CKEditor
        onReady={ (editor: any) => {
          console.log( 'Editor is ready to use!', editor );
        } }
          type=""
          name={name}
          editor={EditorBuild}
          // config={ editorConfiguration }
          data={htmlData}
          onChange={(_event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;