import { useRef } from 'react';
import Button from '@/components/Button';
import SubmitStatus from './SubmitStatus';
import { SubmitResponse } from '@/types/api';

interface Props {
  dismiss: () => void;
  status: SubmitResponse | null;
  show: boolean;
}

const AlertDialog = ({ status, dismiss, show }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  // trap focus inside of modal for accessibility
  if (show && modalRef.current) modalRef.current.focus();

  return (
    <div
      id='overlay'
      className='grid place-content-center bg-gray-200/60 w-full h-full fixed z-50 backdrop-blur-sm'
      data-testid='modal-overlay'
    >
      <div
        id='dialog'
        className='bg-neutral-50 w-84 min-w-fit h-fit py-10 px-12 rounded-xl flex-col space-y-5'
        data-testid='modal-dialog'
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='dialog_label'
        tabIndex={0}
        ref={modalRef}
      >
        <SubmitStatus status={status && status.submitted} />

        <p data-testid='modal-message' id='dialog_label'>
          {status ? status.message : 'Processing'}
        </p>

        <Button label='Close' onClick={dismiss} />
      </div>
    </div>
  );
};

export default AlertDialog;
