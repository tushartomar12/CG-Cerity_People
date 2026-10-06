import { MeshBackground } from "@/components/MeshBackground";
import { cn } from "@/lib/utils";

export function HeroSection({
  title,
  description,
  children,
  className,
  size = "default",
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "compact";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-slate-50 to-white",
        size === "default" ? "py-16 sm:py-24" : "py-12 sm:py-16",
        className,
      )}
    >
      <MeshBackground />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              {description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
