import { SubmitResponse } from '@server/types/api';
import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import SignUpForm from './components/SignUpForm';
import '@fontsource/montserrat';
import Logo from './components/Logo';
import Splash from './components/Splash';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitResponse | null>(null);
  const bgColor = { backgroundColor: '#fcd6e8' };

  function dismissModal() {
    setIsProcessing(false);
  }

  return (
    <main className='h-screen' style={bgColor}>
      <Modal dismiss={dismissModal} status={submitStatus} show={isProcessing} />
      <div className='flex h-full'>
        <Splash />
        <article className='w-full rounded-none bg-white grid place-content-center lg:rounded-l-3xl lg:w-1/2'>
          <Logo />
          <SignUpForm status={setSubmitStatus} processing={setIsProcessing} />
        </article>
      </div>
    </main>
  );
}

export default App;
