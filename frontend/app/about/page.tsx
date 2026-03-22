export default function Page() {
  return (
    <>
      <section className="px-8 pt-10 mb-24 md:mb-40">
        <div className="max-w-7xl mx-auto">
          <p className="font-['Inter'] text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-8">
            Software Developer
          </p>
          <h1 className="font-['Inter'] font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-primary uppercase mb-12">
            ADI SUDIRTA
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <div className="aspect-video bg-surface-container overflow-hidden group">
                <img
                  alt="Adi Sudirta"
                  className="w-full h-full object-cover object-bottom grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  src="/images/about-hero.jpeg"
                />
              </div>
            </div>
            <div className="md:col-span-5 pb-2">
              <p className="text-headline-lg font-light text-on-surface-variant leading-relaxed text-xl md:text-2xl">
                A software developer based in Bali, Indonesia, with a professional background in
                software development and experience in fintech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24 md:py-40">
        <div className="px-8 max-w-7xl mx-auto">
          <h2 className="font-['Inter'] text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-20">
            Chronicle
          </h2>
          <div className="space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-start group">
              <div className="mb-4 md:mb-0">
                <span className="font-mono text-xs text-neutral-500">2024 — PRESENT</span>
                <h3 className="text-3xl font-['Inter'] font-black tracking-tighter uppercase text-primary mt-2">
                  Web Engineer @ Mobee
                </h3>
              </div>
              <div className="max-w-md">
                <p className="text-on-surface-variant leading-relaxed">
                  Currently working as a Web Engineer at Mobee Digital Asset Exchange since 2024,
                  responsible for developing and managing the Mobee Web Exchange (mobee.com/app),
                  the Admin Control Panel, the KYC system, and the OTC platform.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start group">
              <div className="mb-4 md:mb-0">
                <span className="font-mono text-xs text-neutral-500">2021 — 2023</span>
                <h3 className="text-3xl font-['Inter'] font-black tracking-tighter uppercase text-primary mt-2">
                  Front-End Developer @ Xarana
                </h3>
              </div>
              <div className="max-w-md">
                <p className="text-on-surface-variant leading-relaxed">
                  Worked as a Front End Developer at PT. Sarana Digital Solusindo from 2021 to 2023,
                  where I developed and managed the Xarana Fleet Tracking platform for both web and
                  mobile applications, the Xarana landing page, and the Xarana Fleet Management
                  system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
        <div className="py-24 md:py-40 bg-linear-to-b from-white w-full h-full">
          <div className="px-8 max-w-7xl mx-auto text-center">
            <h2 className="font-['Inter'] text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter uppercase mb-12">
              Connect to the Node
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                className="px-8 py-4 bg-surface-container-high text-primary font-bold uppercase tracking-widest text-xs border border-gray-700/5 hover:bg-gray-100 transition-all"
                href="https://github.com/Adisudirta"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="px-8 py-4 bg-surface-container-high text-primary font-bold uppercase tracking-widest text-xs border border-gray-700/5 hover:bg-gray-100 transition-all"
                href="https://www.linkedin.com/in/adi-sudirtayasa-8a729b209/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="px-8 py-4 bg-surface-container-high text-primary font-bold uppercase tracking-widest text-xs border border-gray-700/5 hover:bg-gray-100 transition-all"
                href="https://www.instagram.com/yanadisudirtaa/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <a
                className="px-8 py-4 bg-surface-container-high text-primary font-bold uppercase tracking-widest text-xs border border-gray-700/5 hover:bg-gray-100 transition-all"
                href="mailto:yanadisudirta@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
