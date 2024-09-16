const Footer = () => {
  return (
    <footer className='w-full h-16 bg-secondary py-4'>
      <div className='max-w-7xl mx-auto flex justify-center'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} SaveSpot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
