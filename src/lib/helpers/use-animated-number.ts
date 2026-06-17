import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    const startValue = valueRef.current;
    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const next = Math.round(
        startValue + (target - startValue) * easeOutCubic(progress),
      );
      valueRef.current = next;
      setValue(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
