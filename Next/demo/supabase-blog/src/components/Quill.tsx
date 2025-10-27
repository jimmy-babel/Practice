'use client'
import { useEffect, useRef } from 'react'
import Quill from 'quill'
import type Toolbar from 'quill/modules/toolbar'; // 注意这里的路径

import 'quill/dist/quill.snow.css' // 引入 Quill 样式

export default function QuillImageEditor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current) return
    const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], [{ 'header': 1 }, { 'header': 2 }], ['image']  ];

    // 初始化 Quill 编辑器
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow', // 带工具栏的主题
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: 'placeholder...'
    })

    // 监听图片上传按钮点击（可选，用于自定义交互）
    const toolbar = quillRef.current.getModule('toolbar') as Toolbar
    console.log('toolbar',toolbar);
    // toolbar.addHandler('image', ()=>{
    //   console.log('image addhandler 测试');
    // });
  }, [])

  return (
    <div 
      ref={editorRef} 
      style={{ 
        border: '1px solid #e0e0e0', 
        minHeight: '300px', 
        marginTop: '10px' 
      }} 
    />
  )
}