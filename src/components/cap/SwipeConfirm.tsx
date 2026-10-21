import { ChevronsRight } from "lucide-react";
import { useRef, useState } from "react";

/** Max it–style "glisser pour valider". Keyboard/tap fallback: Enter or double-tap the handle. */
export function SwipeConfirm({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const HANDLE = 56;
  const max = () => (track.current?.clientWidth ?? 300) - HANDLE - 8;

  const end = () => {
    if (drag === null) return;
    if (x > max() * 0.8) { setX(max()); onConfirm(); } else setX(0);
    setDrag(null);
  };

  return (
    <div ref={track} className="relative h-16 select-none overflow-hidden rounded-2xl bg-brand p-1 touch-none">
      <span className="pointer-events-none absolute inset-0 grid place-items-center pl-12 text-base font-bold text-primary-foreground" style={{ opacity: 1 - x / (max() || 1) }}>
        {label}
      </span>
      <button
        type="button"
        aria-label={label}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onConfirm(); } }}
        onDoubleClick={onConfirm}
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); setDrag(e.clientX - x); }}
        onPointerMove={(e) => { if (drag !== null) setX(Math.min(max(), Math.max(0, e.clientX - drag))); }}
        onPointerUp={end}
        onPointerCancel={end}
        className="relative grid h-14 w-14 place-items-center rounded-xl bg-card text-primary"
        style={{ transform: `translateX(${x}px)`, transition: drag === null ? "transform .25s" : "none" }}
      >
        <ChevronsRight className="size-7" aria-hidden />
      </button>
    </div>
  );
}
