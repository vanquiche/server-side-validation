import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';

interface Props {
  status: boolean | null;
}

const SubmitStatus = ({ status }: Props) => {
  const iconSize = 48;
  return (
    <span className='grid place-content-center'>
      {status === null ? (
        <AiOutlineLoading3Quarters
          className='animate-spin'
          size={iconSize}
          color='blue'
          data-testid='status-loading'
        />
      ) : status === false ? (
        <AiFillCloseCircle
          size={iconSize}
          color='red'
          data-testid='status-invalid'
        />
      ) : status === true ? (
        <AiFillCheckCircle
          size={iconSize}
          className='p-0 m-0'
          color='green'
          data-testid='status-valid'
        />
      ) : null}
    </span>
  );
};

export default SubmitStatus;
