import Link from "next/link";
import { LogoBrand } from "@/components/LogoBrand";
import { siteConfig } from "@/lib/site-config";

type Props = {
  children: React.ReactNode;
};

export function Assessment0Shell({ children }: Props) {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="relative z-10 pb-8">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block">
          <LogoBrand layout="header" className="h-10 sm:h-11" />
        </Link>
      </div>
      {children}
    </div>
  );
}
