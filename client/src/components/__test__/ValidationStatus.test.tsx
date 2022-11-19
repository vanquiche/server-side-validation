import { render, screen } from '@testing-library/react';
import ValidationStatus from '../ValidationStatus';
import { TouchObject } from '../../types';

const validationLoading: TouchObject = {
  isLoading: true,
  validated: false,
  message: '',
};

const validationInvalidated: TouchObject = {
  isLoading: false,
  validated: false,
  message: '',
};

const validationValidated: TouchObject = {
  isLoading: false,
  validated: true,
  message: '',
};

test('received prop is null', () => {
  render(<ValidationStatus validation={null} />);
  const wrapper = screen.getByTestId('validation-wrapper');
  expect(wrapper.hasChildNodes()).toBe(false);
});

test('is loading', () => {
  render(<ValidationStatus validation={validationLoading} />);
  const loadingIcon = screen.getByTestId('validation-loading');
  expect(loadingIcon).toBeInTheDocument();
});

test('is invalidated', () => {
  render(<ValidationStatus validation={validationInvalidated} />);
  const invalidatedIcon = screen.getByTestId('validation-invalidated');
  expect(invalidatedIcon).toBeInTheDocument();
});

test('is validated', () => {
  render(<ValidationStatus validation={validationValidated} />);
  const validatedIcon = screen.getByTestId('validation-validated');
  expect(validatedIcon).toBeInTheDocument();
});
