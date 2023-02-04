import {
  ChangeEvent,
  useState,
  useMemo,
  useCallback,
  SyntheticEvent,
} from 'react';
import InputField from './InputField';
import { SubmitResponse, ValidationResponse } from '@/types/api';
import { ContactForm, TouchObject } from './types';
import {
  validateFieldAgainstServer,
  submitToServer,
} from 'src/utilities/server';
import debounce from 'lodash.debounce';
import Button from './Button';
import '@fontsource/montserrat';
const defaultForm = {
  name: '',
  email: '',
  phone: '',
};

const defaultValidations = {
  name: null,
  email: null,
  phone: null,
};

interface Props {
  status: (response: SubmitResponse) => void;
  processing: (state: boolean) => void;
}

const SignUpForm = ({ status, processing }: Props) => {
  const [formData, setFormData] = useState<ContactForm>(defaultForm);
  const [validationStatus, setValidationStatus] =
    useState<Record<string, TouchObject | null>>(defaultValidations);

  const formIsEmpty = useMemo(() => {
    if (formData.name || formData.email || formData.phone) return false;
    else return true;
  }, [formData]);

  const canSubmit = useMemo(() => {
    const checkValues = Object.values(validationStatus).every(
      (field) => field?.validated === true
    );
    return checkValues;
  }, [validationStatus]);

  const debounceValidation = useCallback(
    debounce((field, val) => validateField(field, val), 700),
    []
  );

  function clearForm() {
    if (formIsEmpty) return;
    setFormData(defaultForm);
    setValidationStatus(defaultValidations);
  }

  async function validateField(field: any, value: string) {
    try {
      setValidationStatus((prev) => ({
        ...prev,
        [field]: { ...prev[field], isLoading: true },
      }));
      const response: ValidationResponse = await validateFieldAgainstServer(
        field,
        value
      );
      setValidationStatus((prev) => ({
        ...prev,
        [field]: {
          message: response.message,
          validated: response.validated,
          isLoading: false,
        },
      }));
    } catch (error) {
      if (error) {
        setValidationStatus((prev) => ({
          ...prev,
          [field]: {
            message: "Can't reach server. Try again later.",
            validated: false,
            isLoading: false,
          },
        }));
      }
    }
  }

  const handleChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((form) => ({
        ...form,
        [field]: e.target.value,
      }));

      debounceValidation(field, e.target.value);
    };

  const handleBlur = (field: 'name' | 'email' | 'phone') => () => {
    if (!formData[field]) return;
    if (validationStatus[field] && validationStatus[field]?.validated) return;
    validateField(field, formData[field]);
  };

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      processing(true);
      const response: SubmitResponse = await submitToServer({ data: formData });
      if (!response.submitted) {
        // inform user of invalidated fields
        setValidationStatus((prev) => {
          const updated = Object.assign({}, prev, response.validation);
          return updated;
        });
        status(response);
      } else if (response.submitted) {
        clearForm();
        status(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className='flex-col rounded-xl min-w-fit w-1/5 mt-4'
      onSubmit={handleSubmit}
      data-testid='signup-form'
    >
      <fieldset>
        <legend className='tracking-wide text-xl text-center w-full font-medium'>
          Sign Up
        </legend>
        <InputField
          name='name'
          type='text'
          label='first name'
          value={formData.name}
          validation={validationStatus.name}
          handleChange={handleChange('name')}
          handleBlur={handleBlur('name')}
          placeholder='e.g. Lassie'
        />

        <InputField
          name='phone'
          type='text'
          label='phone number'
          value={formData.phone}
          validation={validationStatus.phone}
          handleChange={handleChange('phone')}
          handleBlur={handleBlur('phone')}
          placeholder='e.g. 425 555 2676'
        />

        <InputField
          name='email'
          type='email'
          label='email address'
          value={formData.email}
          validation={validationStatus.email}
          handleChange={handleChange('email')}
          handleBlur={handleBlur('email')}
          placeholder='e.g. lassie@gmail.com'
        />

        <div className='flex space-x-2 mt-5'>
          <Button type='reset' onClick={clearForm} label='Cancel' />

          <Button type='submit' label='Submit' disabled={canSubmit === false} />
        </div>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
