'use client';

import { useEffect, useState } from 'react';

import mockTeachers from 'mock-data/teachers.json';
import { useTranslations } from 'next-intl';

import { Header, Table } from 'components/common';
import { ActionTable, AddButton, AddTeacherModal } from 'components/ui';
import { useFlag } from 'hooks/base';
import { useTeacherStore, useTeacherStoreActions } from 'hooks/store/teacher';

const Home = () => {
  const t = useTranslations();

  const [visible, onShowModal, onHideModal] = useFlag();
  const teachers = useTeacherStore(state => state.teachers);
  const { removeTeacher, addTeacher } = useTeacherStoreActions();

  const [teacher, setTeacher] = useState();

  useEffect(() => {
    if (teachers.length === 0) {
      mockTeachers.forEach(teacherItem => addTeacher(teacherItem));
    }
  }, []);

  const handleEdit = value => {
    setTeacher(value);
    onShowModal();
  };

  const afterClose = () => {
    if (teacher) {
      setTeacher();
    }
  };

  const columns = [
    {
      title: t('home.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('home.image'),
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: url => <img src={url} alt="Teacher" className="size-14 rounded-full object-cover" />
    },
    {
      title: t('home.subject'),
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: t('home.location'),
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: t('home.rating'),
      dataIndex: 'rating',
      key: 'rating',
      render: rating => {
        return (
          <span className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </span>
        );
      }
    },
    {
      title: t('home.fee'),
      dataIndex: 'fee',
      key: 'fee'
    },
    {
      title: t('common.action'),
      key: 'action',
      fixed: 'right',
      width: 110,
      render: value => {
        return <ActionTable onConfirmDelete={() => removeTeacher(value.id)} onEdit={() => handleEdit(value)} />;
      }
    }
  ];

  return (
    <div>
      <Header className="justify-end">
        <AddButton onClick={onShowModal} />
      </Header>
      <Table dataSource={teachers} columns={columns} />
      <AddTeacherModal open={visible} onCancel={onHideModal} teacher={teacher} afterClose={afterClose} />
    </div>
  );
};

export default Home;
