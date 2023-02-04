import type { NextApiRequest, NextApiResponse } from 'next';
import { ValidationResponse, ErrorMessages } from '@/types/api';
import { validateEmail } from './validation';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidationResponse>
) {
  const { email } = req.body;
  // check for non-alphabet chars
  const validated = validateEmail(email);
  if (validated) {
    res.status(200).send({
      message: 'Success',
      validated: true,
    });
  } else {
    res.status(400).send({
      message: ErrorMessages.email,
      validated: false,
    });
  }
}
