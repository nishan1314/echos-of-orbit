import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";
import boy from "@/assets/explorer-boy.png";
import girl from "@/assets/explorer-girl.png";
import moonTex from "@/assets/moon-tex.jpg";
import marsTex from "@/assets/mars-tex.jpg";
import { GAME_NAME, type Character, type Destination } from "./constants";
import { MusicButton } from "./MusicButton";
import { pauseMusic, resumeMusic } from "@/lib/music";

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

export function Dashboard({ character, guestId, musicOn, onToggleMusic, onNavigate }: { character: Character; guestId: string; musicOn: boolean; onToggleMusic: () => void; onNavigate: (target: string) => void }) {
  const [dest, setDest] = useState<Destination | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const active = DESTS.find((d) => d.id === dest);

  useEffect(() => {
    if (musicOn) {
      if (active) pauseMusic();
      else resumeMusic();
    }
  }, [active, musicOn]);

  return (
    <div className="relative z-10 min-h-screen">
      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 py-6 sm:px-8 bg-transparent">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="20" r="7" /><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(-25 20 20)" /><circle cx="34" cy="13" r="2" fill="currentColor" />
          </svg>
          <span className="font-display text-sm font-black tracking-[0.2em]">{GAME_NAME}</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-4">
          <div className="glass flex items-center gap-2 rounded-full py-1 pl-1 pr-3">
            <div className="h-7 w-7 overflow-hidden rounded-full border border-primary/60 bg-secondary">
              <img src={character === "boy" ? boy : girl} alt="Your explorer" className="h-[300%] w-auto max-w-none -translate-x-[22%] object-cover object-top" />
            </div>
            <span className="font-display text-[10px] tracking-[0.15em] text-primary">{guestId}</span>
          </div>
          <MusicButton on={musicOn} onToggle={onToggleMusic} />
        </div>

        <button className="sm:hidden p-2 text-primary" onClick={() => setMobileMenu(true)}>
          <Menu className="h-7 w-7" />
        </button>
      </motion.header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <section className="px-6 pt-32 text-center sm:pt-48">
          <motion.p initial={{ opacity: 0, letterSpacing: "0.8em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ delay: 0.3, duration: 1.2 }} className="font-display text-xs text-primary">WELCOME, EXPLORER</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-3 font-display text-3xl font-black tracking-wide sm:text-5xl">Where will your journey begin?</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mx-auto mt-4 max-w-xl text-muted-foreground">Explore the places where NASA left its mark — and uncover the stories that remain.</motion.p>
        </section>

        <section className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[9vw] pb-16 pt-6 sm:mx-auto sm:grid sm:max-w-7xl sm:grid-cols-3 sm:overflow-visible sm:px-8 lg:gap-10">
          {DESTS.map((d, i) => <DestinationWorld key={d.id} d={d} i={i} onOpen={() => setDest(d.id)} />)}
        </section>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDest(null)}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} exit={{ scale: 1.1, opacity: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass hud-corners relative w-full max-w-lg overflow-hidden rounded-2xl p-8 text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="font-display text-[10px] tracking-[0.5em] text-primary">MISSION DESTINATION</p>
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

      <aside className="hidden sm:flex absolute right-12 sm:right-16 top-24 z-20 flex-col items-center gap-4 pointer-events-none">
        {["MISSIONS", "STORIES", "ABOUT"].map((text) => (
          <button key={text} onClick={() => { if(text === "MISSIONS") onNavigate("missions"); if(text === "ABOUT") onNavigate("about"); }} className="pointer-events-auto rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-3 font-display text-[10px] font-bold tracking-[0.3em] text-orange-500 transition-all duration-300 hover:border-orange-500/80 hover:bg-orange-500/20 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] sm:text-xs">
            {text}
          </button>
        ))}
      </aside>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div className="fixed inset-0 z-[100] flex flex-col bg-background/95 p-6 backdrop-blur-xl sm:hidden" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex justify-end">
              <button className="p-2 text-primary" onClick={() => setMobileMenu(false)}>
                <X className="h-8 w-8" />
              </button>
            </div>
            <div className="mt-8 flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-6">
                <div className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-6">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/60 bg-secondary">
                    <img src={character === "boy" ? boy : girl} alt="Your explorer" className="h-[300%] w-auto max-w-none -translate-x-[22%] object-cover object-top" />
                  </div>
                  <span className="font-display text-xs tracking-[0.15em] text-primary">{guestId}</span>
                </div>
                <div className="flex items-center gap-3 font-display text-xs tracking-widest text-primary">
                  <MusicButton on={musicOn} onToggle={onToggleMusic} /> SOUND
                </div>
              </div>
              <div className="flex w-full max-w-[240px] flex-col items-center gap-6">
                {["MISSIONS", "STORIES", "ABOUT"].map((text) => (
                  <button key={text} onClick={() => { setMobileMenu(false); if(text === "MISSIONS") onNavigate("missions"); if(text === "ABOUT") onNavigate("about"); }} className="w-full rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-4 font-display text-[10px] font-bold tracking-[0.3em] text-orange-500 transition-all active:bg-orange-500/30">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
