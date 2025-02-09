import { useState } from 'react';

const ErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Test error triggered!');
  }

  return <button onClick={handleClick}>Trigger Error</button>;
};

export default ErrorButton;
