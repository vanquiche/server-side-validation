import ErrorMsg from './ErrorMsg';
import { ChangeEvent, useMemo } from 'react';
import ValidationStatus from './ValidationStatus';
import { TouchObject } from '@/components/types';

interface Props {
  type: 'text' | 'number' | 'password' | 'email';
  name: string;
  value: string;
  label: string;
  validation: TouchObject | null;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  type,
  name,
  value,
  label,
  validation,
  placeholder,
  handleChange,
  handleBlur,
}: Props) => {
  const validationColor = useMemo(
    () => (validation && validation.validated ? 'green' : 'red'),
    [validation]
  );

  return (
    <>
      <label
        htmlFor={name}
        className='text-md mt-3 block'
        data-testid={`textfield-label-${name}`}
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          autoComplete='off'
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          data-testid={`textfield-input-${name}`}
          className={`px-2 py-2 mt-1 rounded-md bg-gray-50 focus:outline-${validationColor}-500`}
          inputMode={name === 'phone' ? 'numeric' : 'text'}
        />
        {/* validation checkmark */}
        <ValidationStatus validation={validation} forInput={name} />
      </div>
      {/* validation message */}
      <ErrorMsg response={validation} />
    </>
  );
};

export default InputField;
