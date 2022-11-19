import { SubmitResponse } from '@server/types/api';
import { createPortal } from 'react-dom';
import Button from './Button';
import SubmitStatus from './SubmitStatus';

function createContainerRoot() {
  const container = document.createElement('div');
  container.setAttribute('id', 'portal-root');
  document.body.prepend(container);
  return container;
}

interface Props {
  dismiss: () => void;
  status: SubmitResponse | null;
  show: boolean;
}

const Modal = ({ dismiss, status, show }: Props) => {
  const container =
    document.getElementById('portal-root') || createContainerRoot();

  const Dialog = () => (
    <div
      id='overlay'
      className='grid place-content-center bg-gray-200/60 w-full h-full fixed z-50 backdrop-blur-sm'
      data-testid='modal-overlay'
    >
      <div
        id='dialog'
        className='bg-neutral-50 w-84 min-w-fit h-fit py-10 px-12 rounded-xl flex-col space-y-5'
        data-testid='modal-dialog'
      >
        <SubmitStatus status={status && status.submitted} />

        <p data-testid='modal-message'>
          {status ? status.message : 'Processing'}
        </p>

        <Button label='Close' onClick={dismiss} />
      </div>
    </div>
  );

  if (!show) return null;

  return createPortal(<Dialog />, container);
};

export default Modal;
