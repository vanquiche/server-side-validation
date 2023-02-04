import { TouchObject } from '@/components/types';
import {
  AiOutlineLoading3Quarters,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

interface Props {
  forInput?: string;
  validation: TouchObject | null;
}

const ValidationStatus = ({ validation, forInput }: Props) => {
  return (
    <div
      className='inline absolute top-1/3 pl-2'
      data-testid='validation-wrapper'
    >
      {validation &&
        (validation.isLoading ? (
          <AiOutlineLoading3Quarters
            className='animate-spin'
            color='blue'
            data-testid={`validation-${forInput}-loading`}
          />
        ) : !validation.isLoading && !validation.validated ? (
          // invalidated
          <AiFillCloseCircle
            color='red'
            data-testid={`validation-${forInput}-invalid`}
          />
        ) : !validation.isLoading && validation.validated ? (
          // has validated
          <AiFillCheckCircle
            color='green'
            data-testid={`validation-${forInput}-valid`}
          />
        ) : null)}
    </div>
  );
};

export default ValidationStatus;
