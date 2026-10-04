import { useEffect, useRef } from 'react';

export function useGameLoop(onTick, running) {
  const cb = useRef(onTick);
  cb.current = onTick; // always call the latest closure

  useEffect(() => {
    if (!running) return;
    let raf;
    let last = Date.now();
    const loop = () => {
      const now = Date.now();
      cb.current((now - last) / 1000); // dt in seconds
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}