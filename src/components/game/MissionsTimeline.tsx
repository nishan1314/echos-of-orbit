import { motion } from "framer-motion";
import { ArrowLeft, Rocket } from "lucide-react";
import { GAME_NAME } from "./constants";

const TIMELINE = [
  {
    phase: "PROJECT APOLLO (1969 - 1972)",
    items: [
      { id: "APOLLO_11", date: "July 16 - 24, 1969", landing: "July 20, 1969", crew: "Neil Armstrong, Buzz Aldrin, Michael Collins", location: "Mare Tranquillitatis", lore: "The first crewed lunar landing in human history. Commander Neil Armstrong manually steered the Lunar Module 'Eagle' over a boulder-strewn crater with less than 30 seconds of descent fuel remaining.", hook: "Fuel-critical manual descent lander sequence; low-gravity sample-gathering tutorial." },
      { id: "APOLLO_12", date: "November 14 - 24, 1969", landing: "November 19, 1969", crew: "Pete Conrad, Alan Bean, Richard Gordon", location: "Oceanus Procellarum", lore: "The precision strike mission. Struck twice by atmospheric lightning during launch, restoring flight systems via 'SCE to AUX'. Landed within walking distance of Surveyor 3.", hook: "In-flight electrical malfunction recovery puzzle; precision beacon touchdown near an ancient wreck." },
      { id: "APOLLO_13", date: "April 11 - 17, 1970", landing: "None (Mission Aborted)", crew: "James Lovell, Fred Haise, John Swigert", location: "Circum-lunar Free-Return Loop", lore: "A crisis transformed into a triumph of human ingenuity. At 55 hours outbound, an electrical fault sparked an explosion. The crew retreated into the Lunar Module as a freezing, under-powered lifeboat.", hook: "Survival/triage mechanics: resource conservation, CO2 scrubbing, and emergency ballistic slingshots." },
      { id: "APOLLO_14", date: "January 31 - February 9, 1971", landing: "February 5, 1971", crew: "Alan Shepard, Edgar Mitchell, Stuart Roosa", location: "Fra Mauro Formation", lore: "The redemption mission. Shepard and Mitchell pushed a wheeled Modular Equipment Transporter up Cone Crater. Shepard drove two golf balls into the vacuum.", hook: "Long-range uphill navigation on foot with deployable handcarts; hidden sports Easter egg." },
      { id: "APOLLO_15", date: "July 26 - August 7, 1971", landing: "July 30, 1971", crew: "David Scott, James Irwin, Alfred Worden", location: "Hadley-Apennine / Hadley Rille", lore: "The debut of the 'J-series' heavy scientific missions. First humans to drive the Lunar Roving Vehicle. Recovered the famous 4.1-billion-year-old 'Genesis Rock'.", hook: "Rover traversal and battery management across canyon rifts; rare relic extraction." },
      { id: "APOLLO_16", date: "April 16 - 27, 1972", landing: "April 21, 1972", crew: "John Young, Charles Duke, Ken Mattingly", location: "Descartes Highlands", lore: "The high-altitude plateau expedition. Set a lunar land speed record of roughly 18 km/h and deployed the first astronomical observatory on the surface.", hook: "Highland driving physics; deploying and aligning surface telescopes for scan data." },
      { id: "APOLLO_17", date: "December 7 - 19, 1972", landing: "December 11, 1972", crew: "Eugene Cernan, Harrison Schmitt, Ronald Evans", location: "Taurus-Littrow Valley", lore: "The final landing of the Apollo era. Schmitt was the first trained geologist in space. Discovered orange pyroclastic soil revealing an explosive volcanic past.", hook: "Advanced field geology prospecting; end-of-campaign farewell sequences." },
    ]
  },
  {
    phase: "INTERIM SCIENTIFIC SURVEY (1994 - 2012)",
    items: [
      { id: "CLEMENTINE & PROSPECTOR", date: "1994 & 1998", landing: "Polar Orbits", crew: "Robotic Probes", location: "Lunar Poles", lore: "NASA returned using compact robotic sentinels. Clementine tested military sensors, while Prospector detected anomalous concentrations of hydrogen in permanently shadowed craters.", hook: "Remote orbital scanning; unlocking resource overlays on the global map." },
      { id: "LRO & LCROSS", date: "2009", landing: "Oct 9, 2009 (Impact)", crew: "Orbiter & Impactor", location: "Cabeus Crater", lore: "The mission that verified lunar water ice. LRO mapped topography, while LCROSS deliberately slammed a rocket stage into a shadowed crater to analyze the debris plume.", hook: "Kinetic probe deployment; atmospheric plume spectrometry mini-games." }
    ]
  },
  {
    phase: "THE ARTEMIS DAWN (2022 - 2026)",
    items: [
      { id: "ARTEMIS_I", date: "Nov 16 - Dec 11, 2022", landing: "None", crew: "Uncrewed (Commander Campos)", location: "Distant Retrograde Orbit", lore: "The inaugural test of the mega-class SLS and Orion capsule, executing a skip-entry maneuver through Earth's atmosphere at Mach 32.", hook: "Automated guidance flight; extreme thermal re-entry interface shielding mechanics." },
      { id: "CLPS_ODYSSEUS", date: "Feb 15 - 29, 2024", landing: "Feb 22, 2024", crew: "Commercial Lander", location: "Malapert A Crater", lore: "When primary rangefinders failed during descent, flight controllers reprogrammed an onboard experimental optical sensor mid-flight to patch navigation telemetry.", hook: "Hacking failing landing avionics mid-descent; operating third-party commercial delivery drops." },
      { id: "ARTEMIS_II", date: "April 1 - 10, 2026", landing: "Lunar Flyby", crew: "Wiseman, Glover, Koch, Hansen", location: "Far Side of the Moon", lore: "The first crewed journey to the Moon since 1972. Orion carried the crew on a free-return flyby, breaking the record for farthest distance traveled by humans.", hook: "Crewed deep-space navigation; communications-blackout survival and far-side lunar observation." },
    ]
  }
];

export function MissionsTimeline({ onBack }: { onBack: () => void }) {
  return (
    <motion.div className="relative z-10 min-h-screen bg-transparent text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <header className="sticky top-0 z-20 flex items-center gap-4 bg-background/80 p-4 backdrop-blur-md sm:px-8 sm:py-6 border-b border-border/40">
        <button onClick={onBack} className="rounded-full p-2 text-primary transition-colors hover:bg-primary/20">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <span className="font-display text-sm font-black tracking-[0.2em]">{GAME_NAME} // MISSIONS</span>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-black tracking-widest text-primary glow-cyan sm:text-6xl">ARCHIVE RECORDS</h1>
          <p className="mt-4 text-sm tracking-[0.3em] text-muted-foreground">DECRYPTING HUMANITY'S LUNAR FOOTPRINT</p>
        </div>

        <div className="relative border-l border-primary/30 ml-4 sm:ml-8 space-y-24 pb-24">
          {TIMELINE.map((phase, pIdx) => (
            <div key={phase.phase} className="relative">
              <div className="absolute -left-[21px] flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary/80 shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                <Rocket className="h-4 w-4 text-primary" />
              </div>
              <h2 className="ml-8 font-display text-xl sm:text-2xl font-black tracking-[0.2em] text-foreground mb-8 pt-2">{phase.phase}</h2>
              
              <div className="ml-8 space-y-12">
                {phase.items.map((m, mIdx) => (
                  <motion.div key={m.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: mIdx * 0.1, duration: 0.5 }}
                    className="glass hud-corners rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 hover:bg-primary/10 transition-colors">
                    <div className="mb-6">
                      <h3 className="font-display text-2xl font-bold tracking-widest text-primary glow-cyan">{m.id}</h3>
                    </div>
                    
                    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                      <p><strong className="font-display tracking-widest text-[10px] text-foreground">DATE:</strong> {m.date}</p>
                      <p><strong className="font-display tracking-widest text-[10px] text-foreground">LANDING DATE:</strong> {m.landing}</p>
                      <p><strong className="font-display tracking-widest text-[10px] text-foreground">CREW:</strong> {m.crew}</p>
                      <p><strong className="font-display tracking-widest text-[10px] text-foreground">LOCATION:</strong> {m.location}</p>
                      
                      <div className="pt-4 mt-2 border-t border-primary/10">
                        <p className="text-primary/90 italic" style={{ fontFamily: "'JetBrains Mono', monospace" }}>"{m.lore}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
