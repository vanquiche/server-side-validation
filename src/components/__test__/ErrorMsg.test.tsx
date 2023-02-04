import { render, screen } from '@testing-library/react';
import { TouchObject } from 'src/types';
import ErrorMsg from '../ErrorMsg';

test('received prop is null', () => {
  render(<ErrorMsg response={null} />);
  const errorMessage = screen.queryByTestId('error-message');
  expect(errorMessage).not.toBeInTheDocument();
});

test('renders error message from unsuccessful response', () => {
  const responseObj: TouchObject = {
    isLoading: false,
    validated: false,
    message: 'Error',
  };

  render(<ErrorMsg response={responseObj} />);
  const errorMessage = screen.getByTestId('error-message');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Error');
});

test('no error message rendered from successful response', () => {
  const responseObj: TouchObject = {
    isLoading: false,
    validated: true,
    message: 'all good',
  };

  render(<ErrorMsg response={responseObj} />);
  const errorMessage = screen.queryByTestId('error-message');
  expect(errorMessage).not.toBeInTheDocument();
});
