import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen(ref: RefObject<Element>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    observer.observe(ref.current!);

    // Return is called when the component unmounts or the ref updates. It cleans up the observer.
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
