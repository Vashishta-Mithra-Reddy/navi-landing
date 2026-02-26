export default function Home() {
  const thingy = "{}"
  return (
    <div className="max-w-4xl w-full mx-auto py-2 md:py-4 px-4 bg-background flex flex-col gap-8">
      <section id="hero" className="relative">
      <img src="/hero_ukiyo.webp" alt="navi_hero_ukiyo" className="w-full h-fit"/>
      {/* <span className="absolute top-8 left-10">{thingy[0]} personal agentic system {thingy[1]}</span> */}
      </section>
      <section id="hero-text" className="px-4 flex flex-col gap-4">
      <p className="text-2xl md:text-3xl font-bold">Here to make your life easier.  <span className="font-semibold text-foreground/50 text-2xl md:text-3xl">{thingy[0]} personal agentic system {thingy[1]}</span></p>
      <p className="text-2xl md:text-2xl font-semibold text-foreground/30">Part of Project Apotheosis.</p>
      </section>
    </div>
  );
}
