import { useEffect, useState } from 'react';

export const Loading = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 985);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <img className="size-11 animate-bounce" src="/tree-view/cap-icon.svg" />
      <p className="text-2xl font-bold text-primary">{dots}</p>
    </div>
  );
};
