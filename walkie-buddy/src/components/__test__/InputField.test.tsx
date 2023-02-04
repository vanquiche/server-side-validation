import InputField from '../InputField';
import { render, screen } from '@testing-library/react';

test('renders correctly', () => {
  render(
    <InputField
      type='text'
      name='test'
      value='test value'
      label='Test'
      handleChange={() => {}}
      validation={null}
    />
  );

  const label = screen.getByTestId('textfield-label-test');
  const input = screen.getByLabelText('Test');
  expect(label).toHaveTextContent('Test');
  expect(input).toHaveAttribute('name', 'test');
  expect(input).toHaveAttribute('id', 'test');
  expect(input).toBeInTheDocument();
});
