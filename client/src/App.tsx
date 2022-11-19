import { SubmitResponse } from '@server/types/api';
import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import SignUpForm from './components/SignUpForm';
import '@fontsource/montserrat';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitResponse | null>(null);

  function dismissModal() {
    setIsProcessing(false);
  }

  const fontColor = { color: '#ff595e' };

  return (
    <div className='h-screen' style={{ backgroundColor: '#fcd6e8' }}>
      <Modal dismiss={dismissModal} status={submitStatus} show={isProcessing} />
      <div className='flex h-full'>
        <div className='relative hidden w-1/2 lg:grid place-content-center space-y-5 p-20 pb-60 overflow-hidden'>
          <div className='flex justify-center'>
            <img
              alt='dog portrait'
              src='/shiba.jpg'
              className='h-80 absolute bottom-10 z-0'
              loading='eager'
            />
          </div>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              ...fontColor,
            }}
            className='text-4xl font-extrabold tracking-wide text-white block'
          >
            Need a walking buddy?
          </h1>

          <p style={fontColor} className='tracking-wide text-white z-10'>
            Look no further! <br />
            <strong>Walkie Buddy</strong> lets you find a nearby furry buddy in
            need of a walkie.
            <br />
            In just a matter of minutes you'll be on a stroll with your new bff!
          </p>
          <small
            className='text-md text-center tracking-widest absolute bottom-5 left-1/2 -translate-x-1/2 z-10'
            style={{ fontFamily: 'Montserrat, sans-serif', ...fontColor }}
          >
            walkie&#183;buddy
          </small>
        </div>

        <div className='w-full rounded-none bg-white grid place-content-center lg:rounded-l-3xl lg:w-1/2'>
          <h1
            className='text-2xl text-center tracking-widest'
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            walkie&#183;buddy
          </h1>
          <div className='grid place-content-center'>
            <img
              src='/dog-logo.png'
              alt='logo'
              className='mix-blend-multi
              ply h-20'
            />
          </div>

          <SignUpForm status={setSubmitStatus} processing={setIsProcessing} />
        </div>
      </div>
    </div>
  );
}

export default App;
