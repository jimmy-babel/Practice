'use client';
import { Upload, Button, message, Image, GetProp, UploadFile, UploadProps} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
type Props = {
  defaultFileList?:Array<UploadFile>,
  onFinish?: (value: Array<UploadFile>) => void;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ImageUploader(props: Props) {
  const {defaultFileList=[],onFinish = () => {},} = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [resultList, setResultList] = useState<UploadFile[]>([]);
  useEffect(()=>{
    let result:UploadFile[] = defaultFileList.map(item=>({uid:`cover-${item.uid}`,name:`${item.name}`,url:item.url,status:'done',percent:100}));
    setFileList(result);
    setResultList(result);
  },[defaultFileList])
  const beforeUpload = (file: File) => {
    console.log('beforeUpload',file);
    const isImage = file.type.startsWith('image/');
    if (!isImage) message.error('请上传图片格式文件（JPG/PNG等）');
    
    const isLt = file.size / 1024 / 1024 < 3;
    if (!isLt) message.error('图片大小不能超过3MB');
    
    return isImage && isLt; // 校验通过才触发上传
  };

  // 上传结果处理
  const handleChange = (info: any) => {
    console.log('handleChange',info);
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      onFinish(trimData(info));
      message.success(`图片上传成功，URL：${info.file.response.data.url}`);
      // 这里可保存图片URL到状态/数据库
    } else if (info.file.status === 'removed') {
      onFinish(trimData(info));
    }else if (info.file.status === 'error') {
      message.error('图片上传失败');
    }
  };

  const trimData = (info:any)=>{
    let result = info.fileList.map((file:UploadFile) => ({
      uid: file.uid,
      url: file.url||file?.response?.data?.url||"",
      type: file.type||"",
      name: file.name,
      status: file.status,
      percent: file.percent,
      // fileType: file?.response?.data?.type||"",
    }));
    setResultList(result)
    return result
  }
  
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  
  const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  const UploadBtn = (
    <div>
      <PlusOutlined />
      <div className='pt-2'>上传封面</div>
    </div>
  )
  return (
    <>
      <Upload
        action="/api/upload" // 指向后端API路由
        method="POST"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
      >
        {resultList.length>=1 ? null : UploadBtn}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
    
  );
}