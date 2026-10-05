import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SiteSchema } from "@/components/layout/site-schema";

/** Public site chrome: header, footer and the organisation schema. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteSchema />
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
