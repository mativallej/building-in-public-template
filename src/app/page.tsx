import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/PageSection";
import { Button } from "@/components/Button";

// Temporary scaffold page — replaced by the full building-in-public page in
// Phase 3. Exists so the design system compiles and renders end to end.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto w-full max-w-[1080px] flex-1 px-6">
        <section className="py-16 md:py-24">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Design system online.
          </h1>
          <p className="mt-4 max-w-[680px] text-fg-muted">
            Tokens, fonts, and chrome are wired. The full page arrives in Phase 3.
          </p>
          <div className="mt-6 flex gap-4">
            <Button href="#demo">Solid button</Button>
            <Button href="#demo" variant="text">
              Text link →
            </Button>
          </div>
        </section>
        <PageSection
          id="demo"
          title="A section"
          lead="With a mono eyebrow, an H2, and a lead."
        >
          <p className="text-fg-muted">Content divided by rules, no cards.</p>
        </PageSection>
      </main>
      <SiteFooter />
    </>
  );
}
