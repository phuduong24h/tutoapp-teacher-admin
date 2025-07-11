'use client';

import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload as AntdUpload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { FormWrapperProps } from 'types';

import FormWrapper from '../FormWrapper';

import type { UploadFile, UploadProps as AntdUploadProps } from 'antd';

type FileType = Parameters<Required<AntdUploadProps>['beforeUpload']>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface UploadProps extends Omit<AntdUploadProps, 'children'>, FormWrapperProps {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
  setFieldValue?: (field: string, value: any) => void;
}

const UploadBase = ({ maxCount = 1, onChange, fileList, setFileList, setFieldValue, name, ...props }: UploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<string>>) => {
    const { fileList: newFileList } = info;
    setFileList?.(newFileList);
    onChange?.(info);

    const file = info.file.originFileObj;
    if (file && setFieldValue && name) {
      const base64 = await getBase64(file);
      setFieldValue(name, base64);
    }
  };

  return (
    <>
      <AntdUpload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        maxCount={maxCount}
        multiple={false}
        {...props}
        onChange={handleChange}>
        {(!fileList || fileList.length < maxCount) && (
          <button type="button" className="flex flex-col items-center gap-2 border-none bg-none">
            <PlusOutlined />
            <div>Upload</div>
          </button>
        )}
      </AntdUpload>

      <Image
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: visible => setPreviewOpen(visible),
          afterOpenChange: visible => !visible && setPreviewImage('')
        }}
        src={previewImage}
      />
    </>
  );
};

const Upload = (props: UploadProps) => {
  return (
    <FormWrapper {...props}>
      <UploadBase {...props} />
    </FormWrapper>
  );
};

export default Upload;
