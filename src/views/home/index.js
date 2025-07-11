'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Header, Table } from 'components/common';
import { ActionTable, AddButton, AddTeacherModal } from 'components/ui';
import { useFlag } from 'hooks/base';
import { useTeacherStore, useTeacherStoreActions } from 'hooks/store/teacher';

const Home = () => {
  const t = useTranslations();

  const [visible, onShowModal, onHideModal] = useFlag();
  const teachers = useTeacherStore(state => state.teachers);
  const { removeTeacher } = useTeacherStoreActions();

  const [teacher, setTeacher] = useState();

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
