import { cn } from "@/lib/utils";

export function MeshBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-teal-100/35 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
