import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setIsVisible(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        transform: `translate3d(-100px, -100px, 0)`,
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <img 
        src="/cursor.png" 
        alt="" 
        className="h-8 w-8 -translate-x-1 -translate-y-1"
      />
    </div>
  );
}
