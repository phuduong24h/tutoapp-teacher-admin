'use client';

import { omit } from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TeacherProp {
  id: string;
  name: string;
  subject: string;
  location: number;
  rating: number;
  fee?: number;
  imageUrl?: string;
}

interface TeacherStoreProps {
  teachers: TeacherProp[];
  actions: {
    addTeacher: (id: TeacherProp) => void;
    removeTeacher: (id: string) => void;
    updateTeacher: (id: string, value: TeacherProp) => void;
  };
}

export const useTeacherStore = create<TeacherStoreProps>()(
  devtools(
    persist(
      set => ({
        teachers: [],
        actions: {
          addTeacher: value => {
            set(state => {
              return { ...state, teachers: state.teachers.concat([value]) };
            });
          },
          removeTeacher: id => {
            set(state => ({ teachers: state.teachers.filter(x => x?.id !== id) }));
          },
          updateTeacher: (id, value) => {
            set(state => {
              const index = state.teachers.findIndex(x => x.id === id);
              if (index !== -1) {
                const updatedTeachers = [...state.teachers];
                updatedTeachers[index] = { ...updatedTeachers[index], ...value };
                return { ...state, teachers: updatedTeachers };
              }
              return state;
            });
          }
        }
      }),
      {
        name: 'teacer',
        partialize: state => omit(state, 'actions')
      }
    )
  )
);

export const useTeacherStoreActions = () => useTeacherStore(state => state.actions);
