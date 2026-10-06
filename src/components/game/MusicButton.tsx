import { Volume2, VolumeX } from "lucide-react";

export function MusicButton({ on, onToggle, label = false }: { on: boolean; onToggle: () => void; label?: boolean }) {
  return (
    <button onClick={onToggle} aria-label={on ? "Music off" : "Music on"} className="glass flex items-center gap-2 rounded-full px-3 py-2 font-display text-[10px] tracking-[0.2em] text-primary transition hover:glow-cyan">
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
      {label && <span>{on ? "MUSIC ON" : "MUSIC OFF"}</span>}
      {on && (
        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => <span key={i} className="w-[2px] animate-pulse bg-primary" style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.2}s` }} />)}
        </span>
      )}
    </button>
  );
}
