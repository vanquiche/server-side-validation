interface Props {
  label: string;
  type?: 'reset' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}
const Button = ({ label, disabled, type, onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={`button-${label.toLowerCase()}`}
      disabled={disabled}
      className='font-medium py-2 px-5 w-full rounded-lg text-white
        bg-neutral-800 disabled:bg-gray-200 disabled:text-gray-400'
    >
      {label}
    </button>
  );
};

export default Button;
