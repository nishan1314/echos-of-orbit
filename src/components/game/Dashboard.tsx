import { AnimatePresence, motion } from "framer-motion";
import { Lock, Settings } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import boy from "@/assets/explorer-boy.png";
import girl from "@/assets/explorer-girl.png";
import moonTex from "@/assets/moon-tex.jpg";
import marsTex from "@/assets/mars-tex.jpg";
import { GAME_NAME, type Character, type Destination } from "./constants";
import { MusicButton } from "./MusicButton";

const Planet3D = lazy(() => import("./Planet3D"));

const DESTS: { id: Destination; label: string; code: string; desc: string; brief: string; tone: string; ring: string; tex?: string; stat: string }[] = [
  { id: "moon", label: "MOON", code: "LUNA-01", desc: "Discover the machines and missions that explored Earth's nearest neighbor.", brief: "Prepare to uncover the forgotten machines that helped humanity explore another world.", tone: "text-lunar", ring: "border-lunar/40", tex: moonTex, stat: "384,400 KM" },
  { id: "mars", label: "MARS", code: "ARES-04", desc: "Follow the machines that searched the Red Planet for clues about its past.", brief: "Rovers and landers still rest in the red dust. Their discoveries changed what we know about Mars.", tone: "text-mars-glow", ring: "border-mars/50", tex: marsTex, stat: "225M KM" },
  { id: "deep", label: "DEEP SPACE", code: "VOID-∞", desc: "Travel beyond the planets and discover missions that continue into the unknown.", brief: "Some spacecraft never stopped. They are still travelling, carrying humanity's message into the dark.", tone: "text-nebula", ring: "border-nebula/50", stat: "24B+ KM" },
];

function DestinationWorld({ d, i, onOpen }: { d: (typeof DESTS)[number]; i: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.18, duration: 0.9, ease: "easeOut" }}
      className="group relative flex w-[82vw] shrink-0 snap-center flex-col items-center text-center sm:w-auto">
      <div className="relative aspect-square w-full max-w-[360px]">
        <div className={`absolute inset-[6%] rounded-full border border-dashed ${d.ring} animate-spin-slow transition-all duration-700 ${hover ? "inset-[1%] opacity-100" : "opacity-50"}`} />
        <div className={`absolute inset-[14%] rounded-full border ${d.ring} transition-opacity duration-700 ${hover ? "opacity-80" : "opacity-20"}`} />
        <span className={`absolute left-[6%] top-[8%] font-display text-[9px] tracking-[0.3em] ${d.tone} transition-opacity ${hover ? "opacity-100" : "opacity-50"}`}>{d.code}</span>
        <span className={`absolute bottom-[8%] right-[6%] font-display text-[9px] tracking-[0.3em] ${d.tone} transition-opacity ${hover ? "opacity-100" : "opacity-50"}`}>{d.stat}</span>
        <div className={`absolute inset-0 transition-[filter] duration-500 ${hover ? "brightness-125" : "brightness-100"}`}>
          <Suspense fallback={<div className="m-auto mt-[25%] h-1/2 w-1/2 animate-pulse rounded-full bg-secondary/40" />}>
            <Planet3D kind={d.id} tex={d.tex} hover={hover} />
          </Suspense>
        </div>
      </div>
      <h3 className={`font-display text-2xl font-black tracking-[0.3em] ${d.tone}`}>{d.label}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
      <span className={`mt-4 rounded-full border border-primary/50 px-6 py-2 font-display text-xs font-bold tracking-[0.3em] text-primary transition-all duration-500 ${hover ? "bg-primary/15 opacity-100 glow-cyan" : "opacity-60 sm:opacity-0"}`}>
        EXPLORE →
      </span>
    </motion.button>
  );
}

export function Dashboard({ character, guestId, musicOn, onToggleMusic }: { character: Character; guestId: string; musicOn: boolean; onToggleMusic: () => void }) {
  const [dest, setDest] = useState<Destination | null>(null);
  const active = DESTS.find((d) => d.id === dest);
  return (
    <motion.div className="relative z-10 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="glass sticky top-0 z-20 mx-auto flex items-center justify-between gap-3 border-x-0 border-t-0 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="20" r="7" /><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(-25 20 20)" /><circle cx="34" cy="13" r="2" fill="currentColor" />
          </svg>
          <span className="hidden font-display text-sm font-black tracking-[0.2em] md:block">{GAME_NAME}</span>
        </div>
        <nav className="flex items-center gap-1 font-display text-[10px] tracking-[0.2em] sm:gap-2">
          <span className="rounded-full bg-primary/15 px-3 py-1.5 text-primary">HOME</span>
          {["MISSIONS", "COLLECTION", "PROFILE"].map((n) => (
            <span key={n} title="Coming soon" className="hidden items-center gap-1 px-3 py-1.5 text-muted-foreground/60 sm:flex"><Lock className="h-3 w-3" />{n}</span>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="glass flex items-center gap-2 rounded-full py-1 pl-1 pr-3">
            <div className="h-7 w-7 overflow-hidden rounded-full border border-primary/60 bg-secondary">
              <img src={character === "boy" ? boy : girl} alt="Your explorer" className="h-[300%] w-auto max-w-none -translate-x-[22%] object-cover object-top" />
            </div>
            <span className="font-display text-[10px] tracking-[0.15em] text-primary">{guestId}</span>
          </div>
          <MusicButton on={musicOn} onToggle={onToggleMusic} />
          <button aria-label="Settings" className="glass hidden rounded-full p-2 text-muted-foreground transition hover:text-primary sm:block"><Settings className="h-4 w-4" /></button>
        </div>
      </motion.header>

      <section className="px-6 pt-10 text-center sm:pt-14">
        <motion.p initial={{ opacity: 0, letterSpacing: "0.8em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ delay: 0.3, duration: 1.2 }} className="font-display text-xs text-primary">WELCOME, EXPLORER</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-3 font-display text-3xl font-black tracking-wide sm:text-5xl">Where will your journey begin?</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mx-auto mt-4 max-w-xl text-muted-foreground">Explore the places where NASA left its mark — and uncover the stories that remain.</motion.p>
      </section>

      <section className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[9vw] pb-16 pt-6 sm:mx-auto sm:grid sm:max-w-7xl sm:grid-cols-3 sm:overflow-visible sm:px-8 lg:gap-10">
        {DESTS.map((d, i) => <DestinationWorld key={d.id} d={d} i={i} onOpen={() => setDest(d.id)} />)}
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDest(null)}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} exit={{ scale: 1.1, opacity: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass hud-corners relative w-full max-w-lg overflow-hidden rounded-2xl p-8 text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="font-display text-[10px] tracking-[0.5em] text-primary">MISSION DESTINATION · {active.code}</p>
              <div className="mx-auto my-4 h-40 w-40"><Suspense fallback={null}><Planet3D kind={active.id} tex={active.tex} hover /></Suspense></div>
              <h2 className={`font-display text-4xl font-black tracking-[0.3em] ${active.tone}`}>{active.label}</h2>
              <p className="mx-auto mt-4 max-w-sm text-muted-foreground">“{active.brief}”</p>
              <div className="mx-auto mt-6 inline-block rounded border border-primary/40 px-4 py-1 font-display text-xs tracking-[0.4em] text-primary animate-pulse">COMING SOON</div>
              <div className="mt-8">
                <button onClick={() => setDest(null)} className="rounded-full border border-primary/60 px-6 py-3 font-display text-xs font-bold tracking-[0.25em] text-primary transition hover:bg-primary/15 hover:glow-cyan">[ RETURN TO COMMAND CENTER ]</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
