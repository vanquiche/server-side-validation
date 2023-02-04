import { SubmitResponse } from '@/types/api';
import { createPortal } from 'react-dom';
import AlertDialog from './AlertDialog';

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
  // if client has not rendered yet then do not run
  if (typeof window === 'undefined') return null;

  // initialize container when client has rendered
  const container =
    (typeof document !== 'undefined' &&
      document.getElementById('portal-root')) ||
    createContainerRoot();

  if (!show) return null;

  return createPortal(
    <AlertDialog dismiss={dismiss} status={status} show={show} />,
    container as HTMLDivElement
  );
};

export default Modal;
