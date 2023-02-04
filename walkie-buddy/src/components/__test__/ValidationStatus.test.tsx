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
  render(<ValidationStatus validation={null} forInput='test' />);
  const wrapper = screen.getByTestId('validation-wrapper');
  expect(wrapper.hasChildNodes()).toBe(false);
});

test('is loading', () => {
  render(<ValidationStatus validation={validationLoading} forInput='test' />);
  const loadingIcon = screen.getByTestId('validation-test-loading');
  expect(loadingIcon).toBeInTheDocument();
});

test('is invalidated', () => {
  render(
    <ValidationStatus validation={validationInvalidated} forInput='test' />
  );
  const invalidatedIcon = screen.getByTestId('validation-test-invalid');
  expect(invalidatedIcon).toBeInTheDocument();
});

test('is validated', () => {
  render(<ValidationStatus validation={validationValidated} forInput='test' />);
  const validatedIcon = screen.getByTestId('validation-test-valid');
  expect(validatedIcon).toBeInTheDocument();
});
