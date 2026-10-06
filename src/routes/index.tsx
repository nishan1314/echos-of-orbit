import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { SpaceBackground } from "@/components/game/SpaceBackground";
import { LoadingScreen } from "@/components/game/LoadingScreen";
import { CharacterSelection } from "@/components/game/CharacterSelection";
import { Dashboard } from "@/components/game/Dashboard";
import { MusicButton } from "@/components/game/MusicButton";
import { makeGuestId, type Character } from "@/components/game/constants";
import { startMusic, stopMusic } from "@/lib/music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echoes of Orbit — Explore NASA's Forgotten Hardware" },
      { name: "description", content: "A cinematic space-exploration game about the machines NASA left on the Moon, Mars and deep space." },
      { property: "og:title", content: "Echoes of Orbit — Explore NASA's Forgotten Hardware" },
      { property: "og:description", content: "Choose your explorer and journey to the Moon, Mars and deep space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Stage = "loading" | "select" | "dashboard";

function Game() {
  const [stage, setStage] = useState<Stage>("loading");
  const [character, setCharacter] = useState<Character | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [musicWanted, setMusicWanted] = useState(true);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const m = localStorage.getItem("musicEnabled");
    if (m === "false") setMusicWanted(false);
  }, []);

  // Try autoplay; if blocked, start on first interaction.
  useEffect(() => {
    if (!musicWanted) return;
    let done = false;
    const tryStart = async () => {
      if (done) return;
      const ok = await startMusic();
      if (ok) { done = true; setMusicOn(true); remove(); }
    };
    const remove = () => ["pointerdown", "keydown"].forEach((e) => window.removeEventListener(e, tryStart));
    ["pointerdown", "keydown"].forEach((e) => window.addEventListener(e, tryStart));
    tryStart();
    return remove;
  }, [musicWanted]);

  const toggleMusic = async () => {
    if (musicOn) { stopMusic(); setMusicOn(false); setMusicWanted(false); localStorage.setItem("musicEnabled", "false"); }
    else { const ok = await startMusic(); setMusicOn(ok); setMusicWanted(true); localStorage.setItem("musicEnabled", "true"); }
  };

  const onLoaded = useCallback(() => {
    const c = localStorage.getItem("selectedCharacter") as Character | null;
    const g = localStorage.getItem("guestId");
    if (c && g) { setCharacter(c); setGuestId(g); }
    setStage("select");
  }, []);

  const select = (c: Character) => {
    setCharacter(c);
    const id = guestId ?? makeGuestId();
    setGuestId(id);
    localStorage.setItem("selectedCharacter", c);
    localStorage.setItem("guestId", id);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground speed={stage === "loading" ? 3 : 1} />
      {stage !== "dashboard" && (
        <div className="fixed right-4 top-4 z-30"><MusicButton on={musicOn} onToggle={toggleMusic} label /></div>
      )}
      <AnimatePresence mode="wait">
        {stage === "loading" && <LoadingScreen key="l" onDone={onLoaded} />}
        {stage === "select" && <CharacterSelection key="s" selected={character} guestId={guestId} onSelect={select} onEnter={() => setStage("dashboard")} />}
        {stage === "dashboard" && character && guestId && <Dashboard key="d" character={character} guestId={guestId} musicOn={musicOn} onToggleMusic={toggleMusic} />}
      </AnimatePresence>
    </main>
  );
}
