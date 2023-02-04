const Splash = () => {
  const fontColor = { color: '#ff595e' };
  const font = { fontFamily: 'Montserrat, sans-serif' };

  return (
    <article className='relative hidden w-1/2 lg:grid place-content-center space-y-5 p-20 pb-60 overflow-hidden'>
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
          ...font,
          ...fontColor,
        }}
        className='text-4xl font-extrabold tracking-wide text-white block z-10'
      >
        Need a walking buddy?
      </h1>

      <p style={fontColor} className='tracking-wide text-white z-10'>
        Look no further! <br />
        <strong>Walkie Buddy</strong> lets you find a nearby furry buddy in need
        of a walkie.
        <br />
        In just a matter of minutes you'll be on a stroll with your new bff!
      </p>
      <p
        className='text-md text-center tracking-widest absolute bottom-5 left-1/2 -translate-x-1/2 z-10'
        style={{ ...font, ...fontColor }}
      >
        walkie&#183;buddy
      </p>
    </article>
  );
};

export default Splash;
