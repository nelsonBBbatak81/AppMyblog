import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";

function Editor({ onChange, editorLoaded, name, value }) {
    const editorRef = useRef();

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        editor.replace("content", {
                            filebrowserUploadUrl:
                                "{{route('upload', ['_token' => csrf_token() ])}}",
                            filebrowserUploadMethod: "form",
                        });
                        const data = editor.getData();
                        // console.log({ event, editor, data })

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
