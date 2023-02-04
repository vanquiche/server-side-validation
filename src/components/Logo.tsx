import Image from 'next/image';
const Logo = () => {
  return (
    <div>
      <h1 className='text-2xl text-center tracking-widest text-black'>
        walkie&#183;buddy
      </h1>
      <div className='grid place-content-center'>
        <Image
          src='/dog-logo.png'
          alt='logo'
          className='mix-blend-multiply'
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Logo;
