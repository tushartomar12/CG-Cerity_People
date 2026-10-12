import { BrandBackground } from "@/components/BrandBackground";
import { ButtonLink } from "./ButtonLink";



export function CTASection({
  title,
  description,
  buttonLabel = "Book a Consultation",
  buttonHref = "/contact",
}: {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <section className="relative overflow-hidden section-padding pb-20" aria-labelledby="cta-heading">
      <div className="container relative">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 shadow-2xl shadow-navy/25 sm:px-10 sm:py-16 lg:px-14">
          <BrandBackground variant="cta" />
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
                variant="accent"
                className="w-full text-center sm:w-auto lg:w-full"
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
