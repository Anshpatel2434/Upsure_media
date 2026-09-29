import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/** Public site chrome. Header and footer read the CMS globals. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
