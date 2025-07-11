'use client';

import { Rate, RateProps } from 'antd';
import { FormikProps, FormWrapperProps } from 'types';

import FormWrapper from './FormWrapper';

interface RatingProps extends FormWrapperProps, Omit<RateProps, 'children'> {}

const RatingBase = ({ ...rest }: RatingProps & FormikProps) => {
  return <Rate {...rest} />;
};

const Rating = (props: RatingProps) => {
  return (
    <FormWrapper {...props}>
      <RatingBase {...props} />
    </FormWrapper>
  );
};

Rating.Base = RatingBase;
export default Rating;
