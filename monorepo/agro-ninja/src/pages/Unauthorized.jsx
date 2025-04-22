const Unauthorized = () => {
  return (
    <div style={{
      backgroundColor: 'beige',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '2.5rem',
        color: '#333',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontWeight: '300'
      }}>
        Unauthorized
      </h1>
    </div>
  );
};

export default Unauthorized;
