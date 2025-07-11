import * as yup from 'yup';

export const TEACHER_FIELDS = {
  NAME: 'name',
  SUBJECT: 'subject',
  LOCATION: 'location',
  RATING: 'rating',
  FEE: 'fee',
  IMAGE_URL: 'imageUrl'
};

export const teacherSchema = t => {
  return yup.object().shape({
    [TEACHER_FIELDS.NAME]: yup.string().required().label(t('home.name')),
    [TEACHER_FIELDS.SUBJECT]: yup.string().required().label(t('home.subject')),
    [TEACHER_FIELDS.LOCATION]: yup.string().required().label(t('home.location')),
    [TEACHER_FIELDS.RATING]: yup.number().min(1).max(5).label(t('home.rating')),
    [TEACHER_FIELDS.FEE]: yup.number().positive().required().label(t('home.fee'))
  });
};
