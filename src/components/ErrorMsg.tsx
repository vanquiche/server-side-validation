import { TouchObject } from '@/components/types';

interface Response {
  response: TouchObject | null;
}

const ErrorMsg = ({ response }: Response) => {
  return (
    <div>
      {response && !response.validated && (
        <p
          className='text-sm mt-2 text-red-500 font-normal'
          data-testid='error-message'
        >
          {response.message}
        </p>
      )}
    </div>
  );
};

export default ErrorMsg;
