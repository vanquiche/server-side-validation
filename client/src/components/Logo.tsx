const Logo = () => {
  return (
    <div>
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
    </div>
  );
};

export default Logo;
