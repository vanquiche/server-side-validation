import Modal from '../Modal';
import { render, screen } from '@testing-library/react';
import { SubmitResponse } from '@server/types/api';

test('Modal renders correctly', () => {
  const response: SubmitResponse = {
    message: '',
    validation: {},
    submitted: true,
  };
  render(<Modal show={true} dismiss={() => {}} status={response} />);
  const overlay = screen.getByTestId('modal-overlay');
  const dialog = screen.getByTestId('modal-dialog');
  expect(overlay).toBeInTheDocument();
  expect(dialog).toBeInTheDocument();
});

test('Modal can be dismissed', async () => {
  const status: SubmitResponse = {
    message: '',
    validation: {},
    submitted: true,
  };

  let show = true;

  function dismiss() {
    show = false;
  }

  const { rerender } = render(
    <Modal show={show} dismiss={dismiss} status={status} />
  );
  const button = screen.getByRole('button');
  button.click();

  rerender(<Modal show={show} dismiss={dismiss} status={status} />);

  const overlay = screen.queryByTestId('modal-overlay');

  expect(overlay).not.toBeInTheDocument();
});

test('Modal show loading while processing', () => {
  render(<Modal show={true} dismiss={() => {}} status={null} />);
  const message = screen.getByTestId('modal-message');
  expect(message).toHaveTextContent('Processing');
});

test('Modal is successfully submitted', () => {
  const submitMsg = 'Submitted';
  const status: SubmitResponse = {
    message: submitMsg,
    validation: {},
    submitted: true,
  };
  render(<Modal show={true} dismiss={() => {}} status={status} />);
  const message = screen.getByTestId('modal-message');
  expect(message).toHaveTextContent(submitMsg);
});

test('Modal fails to submit', () => {
  const submitMsg = 'Failed';
  const status: SubmitResponse = {
    message: submitMsg,
    validation: {},
    submitted: false,
  };
  render(<Modal show={true} dismiss={() => {}} status={status} />);
  const message = screen.getByTestId('modal-message');
  expect(message).toHaveTextContent(submitMsg);
});
