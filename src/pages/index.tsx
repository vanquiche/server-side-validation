import Head from 'next/head';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Logo from '@/components/Logo';
import SignUpForm from '@/components/SignUpForm';
import { SubmitResponse } from '@/types/api';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitResponse | null>(null);
  const bgColor = { backgroundColor: '#fcd6e8' };

  function dismissModal() {
    setSubmitStatus(null);
    setIsProcessing(false);
  }
  return (
    <>
      <Head>
        <title>Walkie Buddy</title>
        <meta
          name='description'
          content='Server-side form sanitization and validation'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen' style={bgColor}>
        <Modal
          dismiss={dismissModal}
          status={submitStatus}
          show={isProcessing}
        />
        <section className='flex h-full'>
          <article className='w-full rounded-none bg-white grid place-content-center'>
            <Logo />
            <SignUpForm status={setSubmitStatus} processing={setIsProcessing} />
          </article>
        </section>
      </main>
    </>
  );
}
