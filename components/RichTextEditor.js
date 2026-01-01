'use client';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({ value, onChange, height = 400 }) {
    const editorRef = useRef(null);

    return (
        <Editor
            apiKey="no-api-key" // Use free tier without API key
            onInit={(evt, editor) => editorRef.current = editor}
            value={value}
            onEditorChange={onChange}
            init={{
                height,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                branding: false,
                promotion: false
            }}
        />
    );
}
