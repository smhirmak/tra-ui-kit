import * as yup from 'yup';

const requiredErrorMessage = 'This field is required';
const emailErrorMessage = 'Invalid email address';

export const contactFormValidationSchema = yup.object().shape({
  name: yup.string().required(requiredErrorMessage),
  email: yup.string().email(emailErrorMessage).required(requiredErrorMessage),
});
