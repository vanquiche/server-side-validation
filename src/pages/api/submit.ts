import {
  SubmitResponse,
  ValidationCheck,
  ErrorMessages,
  SubmitData,
} from '@/types/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateName, validateEmail, validatePhone } from './validation';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitResponse>
) {
  const { data }: SubmitData = req.body;
  const validationResults: Record<string, ValidationCheck> = {};
  // hold result of each field that passes validation
  const allFieldsValidated: boolean[] = [];

  for (const [key, val] of Object.entries(data)) {
    switch (key) {
      case 'name': {
        const ValidationCheck = validateName(val);
        allFieldsValidated.push(ValidationCheck);
        validationResults[key] = {
          message: ErrorMessages.name,
          validated: ValidationCheck,
        };
        break;
      }
      case 'email': {
        const ValidationCheck = validateEmail(val);
        allFieldsValidated.push(ValidationCheck);
        validationResults[key] = {
          message: ErrorMessages.email,
          validated: ValidationCheck,
        };
        break;
      }
      case 'phone': {
        const ValidationCheck = validatePhone(val);
        allFieldsValidated.push(ValidationCheck);
        validationResults[key] = {
          message: ErrorMessages.phone,
          validated: ValidationCheck,
        };
        break;
      }
    }
  }

  // all fields did not pass validation
  if (allFieldsValidated.includes(false)) {
    res.send({
      message: ErrorMessages.submitFailure,
      validation: validationResults,
      submitted: false,
    });
  } else {
    res.send({
      message: ErrorMessages.submitSuccess,
      validation: validationResults,
      submitted: true,
    });
  }
}
