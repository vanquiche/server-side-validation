import { render, screen } from '@testing-library/react';
import SubmitStatus from '../SubmitStatus';

test('render loading icon if status is null', () => {
  render(<SubmitStatus status={null} />);
  const loading = screen.getByTestId('status-loading');
  expect(loading).toBeInTheDocument();
});

test('render close icon if status is invalid', () => {
  render(<SubmitStatus status={false} />);
  const invalid = screen.getByTestId('status-invalid');
  expect(invalid).toBeInTheDocument();
});

test('render check icon if status is valid', () => {
  render(<SubmitStatus status={true} />);
  const valid = screen.getByTestId('status-valid');
  expect(valid).toBeInTheDocument();
});
