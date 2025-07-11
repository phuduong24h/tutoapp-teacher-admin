'use client';

import { useEffect, useState } from 'react';

import { Form, FormikProvider } from 'formik';
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';

import { Modal } from 'components/common';
import { Input, InputArea, Rating } from 'components/form';
import Upload from 'components/form/Upload';
import { useValidate } from 'hooks/base';
import { useTeacherStoreActions } from 'hooks/store/teacher';
import { TEACHER_FIELDS, teacherSchema } from 'utils';

const AddTeacherModal = ({ open, onCancel, teacher, afterClose }) => {
  const t = useTranslations();
  const isEdit = !!teacher;

  const { addTeacher, updateTeacher } = useTeacherStoreActions();

  const [fileList, setFileList] = useState([]);

  const formik = useValidate({
    initialValues: {
      [TEACHER_FIELDS.NAME]: '',
      [TEACHER_FIELDS.SUBJECT]: '',
      [TEACHER_FIELDS.LOCATION]: '',
      [TEACHER_FIELDS.RATING]: 0,
      [TEACHER_FIELDS.FEE]: '',
      [TEACHER_FIELDS.IMAGE_URL]: ''
    },
    validationSchema: teacherSchema(t),
    onSubmit: async value => {
      if (isEdit) {
        updateTeacher(teacher.id, value);
      } else {
        addTeacher({ id: uuidv4(), ...value });
      }
      onCancel();
    }
  });

  useEffect(() => {
    if (open && teacher) {
      formik.setValues({
        [TEACHER_FIELDS.NAME]: teacher.name || '',
        [TEACHER_FIELDS.SUBJECT]: teacher.subject || '',
        [TEACHER_FIELDS.LOCATION]: teacher.location || '',
        [TEACHER_FIELDS.RATING]: teacher.rating || 0,
        [TEACHER_FIELDS.FEE]: teacher.fee || '',
        [TEACHER_FIELDS.IMAGE_URL]: teacher.imageUrl || ''
      });

      if (teacher.imageUrl) {
        setFileList([
          {
            uid: '-1',
            name: 'Ảnh hiện tại',
            status: 'done',
            url: teacher.imageUrl
          }
        ]);
      }
    }
  }, [open]);

  const onAfterClose = () => {
    formik.resetForm();
    setFileList([]);
    afterClose?.();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={t('home.add_teacher')}
      destroyOnClose
      width={750}
      afterClose={onAfterClose}>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              title={t('home.name')}
              placeholder={`${t('common.enter')} ${t('home.name')}`}
              name={TEACHER_FIELDS.NAME}
              required
            />
            <InputArea
              title={t('home.subject')}
              placeholder={`${t('common.enter')} ${t('home.subject')}`}
              name={TEACHER_FIELDS.SUBJECT}
              required
            />
            <Input
              title={t('home.location')}
              placeholder={`${t('common.enter')} ${t('home.location')}`}
              name={TEACHER_FIELDS.LOCATION}
              required
            />
            <Rating title={t('home.rating')} name={TEACHER_FIELDS.RATING} required />
            <Input
              title={t('home.fee')}
              placeholder={`${t('common.enter')} ${t('home.fee')}`}
              name={TEACHER_FIELDS.FEE}
              required
            />
            <Upload
              title="Ảnh đại diện"
              name={TEACHER_FIELDS.IMAGE_URL}
              fileList={fileList}
              setFileList={setFileList}
              setFieldValue={formik.setFieldValue}
            />
          </div>

          <Modal.Footer onCancel={onCancel} disabled={!formik.isValid || !formik.dirty} />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddTeacherModal;
