import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SiteSchema } from "@/components/layout/site-schema";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

/** Public site chrome: header, footer, WhatsApp button and the organisation schema. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteSchema />
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
