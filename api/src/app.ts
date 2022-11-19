import express, { Application, Request, Response } from 'express';
import { validateEmail, validateName, validatePhone } from './validation';
import cors from 'cors';
import {
  SubmitResponse,
  ValidationCheck,
  ValidationResponse,
  ErrorMessages,
} from './types/api';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('/test', (req: Request, res: Response) => {
  res.send({ data: 'hello world' });
});

app.post(
  '/validate-name',
  (req: Request, res: Response<ValidationResponse>) => {
    const { name } = req.body;
    // check for non-alphabet chars
    const validated = validateName(name);
    if (validated) {
      res.send({
        message: 'Success',
        validated: true,
      });
    } else {
      res.send({
        message: ErrorMessages.name,
        validated: false,
      });
    }
  }
);

app.post(
  '/validate-email',
  (req: Request, res: Response<ValidationResponse>) => {
    const { email } = req.body;
    const validated = validateEmail(email);

    if (validated) {
      res.send({
        message: 'Success',
        validated: true,
      });
    } else {
      res.send({
        message: ErrorMessages.email,
        validated: false,
      });
    }
  }
);

app.post(
  '/validate-phone',
  (req: Request, res: Response<ValidationResponse>) => {
    const { phone } = req.body;
    // check for min and max digits and alphabet chars
    const validated = validatePhone(phone);

    if (validated) {
      res.send({
        message: 'Success',
        validated: true,
      });
    } else {
      res.send({
        message: ErrorMessages.phone,
        validated: false,
      });
    }
  }
);

app.post('/submit', (req: Request, res: Response<SubmitResponse>) => {
  const { data }: { data: { name: string; email: string; phone: string } } =
    req.body;
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
});

app.listen(process.env.PORT || 9000, () =>
  console.log('Server running on 9000')
);
