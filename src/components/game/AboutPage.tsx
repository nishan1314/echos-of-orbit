import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import blueDotLogo from "@/assets/BlueDot.png";
import user4Img from "@/assets/user4.png";

const TEAM = [
  { name: "MD. RAFIUZZAMAN RAFI", role: "TEAM LEAD", image: null },
  { name: "AUTHI CHOWDHURY", role: "RESEARCHER / DATA ANALYST", image: null },
  { name: "S.M MOHAIMENUL ISLAM", role: "PRESENTATION & MEDIA", image: null },
  { name: "NISHAN DAS", role: "UI/UX DESIGN", image: user4Img },
  { name: "MOHATAMIM HAQUE", role: "BACKEND DEV", image: null },
  { name: "AVIJIT MONDAL", role: "SYSTEM ANALYST", image: null },
];

export function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div className="relative z-10 min-h-screen bg-transparent text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <header className="sticky top-0 z-20 flex items-center gap-4 bg-background/80 p-4 backdrop-blur-md sm:px-8 sm:py-6 border-b border-border/40">
        <button onClick={onBack} className="rounded-full p-2 text-primary transition-colors hover:bg-primary/20">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <span className="font-display text-sm font-black tracking-[0.2em]">ECHOES OF ORBIT // ABOUT</span>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="text-center mb-24">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="inline-flex items-center justify-center">
            <img src={blueDotLogo} alt="Team BlueDot" className="h-24 sm:h-32 w-auto object-contain" />
          </motion.div>
          <p className="mt-6 text-sm tracking-[0.4em] text-muted-foreground uppercase">The crew behind the mission</p>
        </div>

        {/* 2-4 Formation */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
          {TEAM.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="glass hud-corners w-full sm:w-[280px] rounded-xl border border-slate-600/60 bg-transparent p-6 text-center transition-all duration-300 hover:border-slate-400 hover:bg-slate-500/10 hover:shadow-[0_0_20px_rgba(148,163,184,0.15)]">
              {member.image ? (
                <img src={member.image} alt={member.name} className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-slate-500 object-cover shadow-[0_0_10px_rgba(148,163,184,0.15)]" />
              ) : (
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-slate-500 bg-transparent shadow-[0_0_10px_rgba(148,163,184,0.15)]" />
              )}
              <h3 className="font-display text-lg font-bold tracking-widest text-slate-200">{member.name}</h3>
              <p className="mt-2 text-[10px] tracking-widest text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
