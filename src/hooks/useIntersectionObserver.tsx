/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

interface IntersectionObserverHookProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: IntersectionObserverHookProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const reference = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (reference.current) {
      observer.observe(reference.current);
    }

    return () => {
      if (reference.current) {
        observer.unobserve(reference.current);
      }
    };
  }, [root, rootMargin, threshold]);

  return { reference, isIntersecting };
};

export default useIntersectionObserver;
