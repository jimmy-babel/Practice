'use client'
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import type Toolbar from 'quill/modules/toolbar';
import type { Delta } from 'quill'; // 导入 Delta 类型（需安装 @types/quill）
import 'quill/dist/quill.snow.css';

// 定义组件暴露给父组件的方法类型
interface QuillEditorRef {
  // 获取 Delta 格式内容（推荐）
  getDeltaContent: () => Delta | null;
  // 获取 HTML 格式内容
  getHtmlContent: () => string | null;
  // 获取纯文本内容
  getTextContent: () => string | null;
}


type Props = {
  extraClass?:string,
  customStyle?: React.CSSProperties,
  // initialContent?: Delta
  initialContent?: string
}

// export default function QuillImageEditor(props: Props) {
const QuillEditor = forwardRef<QuillEditorRef, Props>(
  ({ extraClass, customStyle, initialContent }, ref) => {
    
    // const {extraClass,customStyle} = props;
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current) return
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike','code','link','blockquote',{ 'header': 1 }, { 'header': 2 },{ 'background': []},{ 'color': []},],
      [{ 'size': []},{ 'align': []},{ 'indent': '-1' }, { 'indent': '+1' },{ 'list': 'ordered' }, { 'list': 'bullet' },'image','video'], 
      // [{ 'font': []}],
      // [{ 'script': 'sub' }, { 'script': 'super' }], 
      [],
    ];

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
    // 组件卸载时清理
    return () => {
      quillRef.current = null;
    };
  }, [])

  // 向外暴露方法（供父组件调用保存）
  useImperativeHandle(ref, () => ({
    // 获取 Delta 格式内容
    getDeltaContent: () => {
      console.log('进来',quillRef);
      return quillRef.current?.getContents() || null;
    },
    // 获取 HTML 格式内容
    getHtmlContent: () => {
      return quillRef.current?.root.innerHTML || null;
    },
    // 获取纯文本内容
    getTextContent: () => {
      return quillRef.current?.getText() || null;
    },
  }));

  // 初始内容赋值（当 initialContent 存在时）
  useEffect(() => {
    console.log('useEffect initialContent',initialContent);
    if (quillRef.current && initialContent) {
      // 使用 Delta 格式设置内容（推荐）
      quillRef.current.setContents(JSON.parse(initialContent));
    }
  }, [initialContent]); // 监听 initialContent 变化，数据加载后自动赋值


  return (
    <div 
      ref={editorRef} 
      className={extraClass}
      style={customStyle} 
    />
  )
  }
);
export default QuillEditor;