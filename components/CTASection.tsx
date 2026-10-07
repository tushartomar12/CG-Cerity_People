import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "./ButtonLink";



export function CTASection({
  title,
  description,
  buttonLabel = "Book a Consultation",
  buttonHref = "/contact",
 
  secondaryHref = "/hr-tech",
 
}: {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  bullets?: string[];
}) {
  return (
    <section className="section-padding pb-20" aria-labelledby="cta-heading">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 shadow-2xl shadow-navy/25 sm:px-10 sm:py-16 lg:px-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgb(29 78 216) 0%, transparent 45%),
                radial-gradient(circle at 80% 20%, rgb(13 148 136) 0%, transparent 40%)`,
            }}
          />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="text-center lg:text-left">
              <h2
                id="cta-heading"
                className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{description}</p>
              <ul className="mt-8 hidden space-y-3 text-left sm:block">
               
              </ul>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:flex-col lg:items-stretch">
              <ButtonLink
                href={buttonHref}
                variant="primary"
                className="w-full bg-accent text-center hover:bg-teal-600 sm:w-auto lg:w-full"
              >
                {buttonLabel}
              </ButtonLink>
             
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
