import { useEffect, useRef } from 'react';

export const usePrevious = <T extends unknown>(value: T): any => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
