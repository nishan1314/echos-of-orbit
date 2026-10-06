import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GAME_NAME } from "./constants";

const MESSAGES = [
  "Initializing navigation systems...",
  "Scanning abandoned missions...",
  "Locating NASA equipment...",
  "Mapping celestial environments...",
  "Preparing explorer...",
  "Establishing communication...",
  "Opening exploration database...",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const DUR = 6500;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / DUR);
      const eased = 1 - Math.pow(1 - k, 2.2);
      setP(Math.round(eased * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 700);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const msg = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor((p / 100) * MESSAGES.length))];

  return (
    <motion.div
      className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-16"
      exit={{ opacity: 0, scale: 1.15, filter: "blur(8px) brightness(1.8)" }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
    >
      <div />
      <motion.div className="text-center" initial={{ opacity: 0, y: 20, letterSpacing: "0.6em" }} animate={{ opacity: 1, y: 0, letterSpacing: "0.12em" }} transition={{ duration: 2.2, ease: "easeOut" }}>
        <p className="mb-4 font-display text-xs tracking-[0.5em] text-primary/80">NASA HERITAGE ARCHIVE</p>
        <h1 className="font-display text-5xl font-black text-foreground text-glow sm:text-7xl md:text-8xl">{GAME_NAME}</h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.2 }} className="mt-6 text-lg text-muted-foreground sm:text-xl">
          The missions may be over. Their stories are not.
        </motion.p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-full max-w-xl">
        <div className="mb-3 flex items-end justify-between font-display text-[11px] tracking-[0.3em] text-primary">
          <span>INITIALIZING EXPLORATION SYSTEMS</span>
          <span className="text-2xl font-bold tabular-nums text-foreground">{p}%</span>
        </div>
        <div className="hud-corners relative h-3 overflow-hidden rounded-sm border border-border bg-secondary/40 p-[2px]">
          <div className="relative h-full rounded-[2px] bg-gradient-to-r from-accent to-primary glow-cyan transition-[width] duration-150" style={{ width: `${p}%` }}>
            <div className="absolute inset-y-0 w-1/3 animate-scan bg-gradient-to-r from-transparent via-foreground/50 to-transparent" />
          </div>
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground/70">
          {Array.from({ length: 10 }).map((_, i) => <span key={i}>|</span>)}
        </div>
        <motion.p key={msg} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center text-sm tracking-wider text-muted-foreground">
          {msg}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
