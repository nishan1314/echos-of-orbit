import { useEffect, useRef } from "react";

export function SpaceBackground({ speed = 1 }: { speed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    type Star = { x: number; y: number; z: number; r: number; t: number };
    let stars: Star[] = [];
    const shooting: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.floor((w * h) / 2600) }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.2, t: Math.random() * 6.28,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / w - 0.5; mouse.current.y = e.clientY / h - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    let px = 0, py = 0;
    const loop = () => {
      g.clearRect(0, 0, w, h);
      px += (mouse.current.x * 30 - px) * 0.04; py += (mouse.current.y * 30 - py) * 0.04;
      for (const s of stars) {
        s.x -= 0.08 * s.z * speed; s.t += 0.02;
        if (s.x < -40) s.x = w + 40;
        const a = 0.4 + 0.6 * Math.abs(Math.sin(s.t)) * s.z;
        g.fillStyle = `rgba(220,235,255,${a})`;
        g.beginPath(); g.arc(s.x + px * s.z, s.y + py * s.z, s.r * s.z + 0.2, 0, 6.28); g.fill();
      }
      if (Math.random() < 0.004) shooting.push({ x: Math.random() * w, y: Math.random() * h * 0.5, vx: -7 - Math.random() * 4, vy: 3 + Math.random() * 2, life: 1 });
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        const grad = g.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        grad.addColorStop(0, `rgba(200,240,255,${s.life})`); grad.addColorStop(1, "rgba(200,240,255,0)");
        g.strokeStyle = grad; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(s.x, s.y); g.lineTo(s.x - s.vx * 12, s.y - s.vy * 12); g.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 0.015;
        if (s.life <= 0) shooting.splice(i, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, [speed]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-space">
      <div className="absolute inset-0 animate-nebula bg-space opacity-80" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}
