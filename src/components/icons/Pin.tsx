function Pin(props: any) {
  return (
    <svg
      {...props}
      className='size-4'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
    >
      <path
        d='M9.5 14.5L3 21'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path
        d='M5.00007 9.48528L14.1925 18.6777L15.8895 16.9806L15.4974 13.1944L21.0065 8.5211L15.1568 2.67141L10.4834 8.18034L6.69713 7.78823L5.00007 9.48528Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  );
}

export default Pin;
