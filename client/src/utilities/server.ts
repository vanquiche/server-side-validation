import { ValidationResponse } from '@server/types/api';
import { ContactForm } from 'src/types';

export const validateFieldAgainstServer = (
  field: string,
  value: string
): Promise<ValidationResponse> =>
  fetch(`/validate-${field}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [field]: value }),
  }).then((res) => res.json());

export const submitToServer = (form: { data: ContactForm }) =>
  fetch('/submit', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((res) => res.json());
