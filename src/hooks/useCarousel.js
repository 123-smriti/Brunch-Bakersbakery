import { useEffect, useState } from "react";

export default function useCarousel(length, delay = 4500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return [index, setIndex];
}
