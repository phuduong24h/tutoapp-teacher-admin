'use client';

import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload as AntdUpload } from 'antd';
import { FormWrapperProps } from 'types';

import FormWrapper from '../FormWrapper';

import type { UploadFile, UploadProps as AntdUploadProps } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';

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
  name?: string;
}

const UploadBase = ({ maxCount = 1, onChange, fileList, setFileList, setFieldValue, name, ...props }: UploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.preview || file.url || '');
    setPreviewOpen(true);
  };

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    const { fileList: newFileList } = info;

    const updatedFileList = await Promise.all(
      newFileList.map(async file => {
        if (file.originFileObj && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file;
      })
    );

    setFileList(updatedFileList);
    onChange?.({ ...info, fileList: updatedFileList });

    const lastFile = updatedFileList[updatedFileList.length - 1];
    if (lastFile?.preview && setFieldValue && name) {
      setFieldValue(name, lastFile.preview);
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
        onChange={handleChange}
        beforeUpload={() => false}
        {...props}>
        {fileList.length < maxCount && (
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
