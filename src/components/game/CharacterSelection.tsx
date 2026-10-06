import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import boy from "@/assets/explorer-boy.png";
import girl from "@/assets/explorer-girl.png";
import type { Character } from "./constants";

const CHARS: { id: Character; img: string; name: string; tag: string }[] = [
  { id: "boy", img: boy, name: "Reid Wiseman", tag: "Commander" },
  { id: "girl", img: girl, name: "Christina Koch", tag: "Mission Specialist" },
];

export function CharacterSelection({ selected, guestId, onSelect, onEnter }: { selected: Character | null; guestId: string | null; onSelect: (c: Character) => void; onEnter: () => void }) {
  return (
    <motion.div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-10 sm:py-14"
      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -40, filter: "blur(6px)" }} transition={{ duration: 1 }}>
      <h1 className="mt-3 text-center font-display text-3xl font-black tracking-[0.12em] text-glow sm:text-5xl">CHOOSE YOUR EXPLORER</h1>
      <p className="mt-3 text-center text-muted-foreground">Every great discovery starts with an explorer.</p>

      <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-8">
        {CHARS.map((c, i) => {
          const active = selected === c.id;
          return (
            <motion.button key={c.id} onClick={() => onSelect(c.id)}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className={`group hud-corners relative flex flex-col items-center overflow-hidden rounded-2xl border p-3 text-left transition-all duration-500 sm:p-6 ${active ? "border-primary bg-primary/10 glow-cyan" : "glass hover:border-primary/60"}`}>
              <div className={`absolute bottom-16 sm:bottom-20 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-[50%] blur-2xl transition-opacity duration-500 ${active ? "bg-primary/50 opacity-100" : "bg-primary/30 opacity-40 group-hover:opacity-80"}`} />
              <div className="absolute bottom-20 sm:bottom-24 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] border border-primary/40" />
              <img src={c.img} alt={`${c.name} space explorer`} width={768} height={1152}
                className={`relative h-56 w-auto object-contain transition-all duration-500 group-hover:-translate-y-2 sm:h-96 ${active ? "animate-float brightness-110" : "brightness-75 group-hover:brightness-100"}`} />
              <div className="relative mt-8 sm:mt-10 w-full text-center z-10">
                <div className="font-display text-sm font-bold tracking-[0.25em] sm:text-lg">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.tag}</div>
              </div>
              <AnimatePresence>
                {active && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-display text-[9px] font-bold tracking-[0.15em] text-primary-foreground sm:text-[10px]">
                    <Check className="h-3 w-3" /> EXPLORER SELECTED
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {guestId && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex flex-col items-center gap-6">
            <div className="glass hud-corners rounded-lg px-6 py-3 text-center">
              <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">EXPLORER ID</div>
              <div className="font-display text-2xl font-bold tracking-[0.2em] text-primary text-glow">{guestId}</div>
            </div>
            <motion.button onClick={onEnter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent to-primary px-10 py-4 font-display text-sm font-black tracking-[0.25em] text-primary-foreground glow-cyan sm:text-base">
              <span className="absolute inset-y-0 w-1/3 animate-scan bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
              <span className="relative">ENTER THE UNIVERSE <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
