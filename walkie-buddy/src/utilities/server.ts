import { ValidationResponse } from '@/types/api';
import { ContactForm } from '@/components/types';

export const validateFieldAgainstServer = (
  field: string,
  value: string
): Promise<ValidationResponse> =>
  fetch(`api/validate-${field}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [field]: value }),
  }).then((res) => res.json());

export const submitToServer = (form: { data: ContactForm }) =>
  fetch('api/submit', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((res) => res.json());
