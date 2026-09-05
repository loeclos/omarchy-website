import { Reveal } from './Sections'

const ABOUT_POINTS = [
  {
    index: '01',
    title: 'OPINIONATED',
    body: 'One curated stack — Arch + Hyprland + sane defaults. No distro-hopping, no weekend ricing to get productive.',
  },
  {
    index: '02',
    title: 'MALLEABLE',
    body: 'Every setting lives in plain text under ~/.config. Read it, diff it, vibe-code it with your agent.',
  },
  {
    index: '03',
    title: 'BEAUTIFUL',
    body: "DHH's daily rig, shipped as an ISO. Themes, waybar, lock screen — gorgeous on first boot.",
  },
]

export function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-6 font-inter text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-lambda-ink">An omakase </span>
              <span className="text-lambda-dim">Linux for </span>
              <span className="text-omarchy-cream">developers.</span>
            </h2>
            <p className="max-w-md text-sm normal-case tracking-normal leading-relaxed text-lambda-dim md:text-base">
              Omarchy is DHH&apos;s opinionated Arch Linux + Hyprland distro.
              It takes the pain of building a tiling setup from scratch and
              replaces it with a complete, keyboard-first system — free,
              MIT-licensed, and rolling forever.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href="https://learn.omacom.io/2/the-omarchy-manual"
                target="_blank"
                rel="noreferrer"
                className="font-inter text-[13px] uppercase tracking-[0.18em] text-lambda-ink transition-colors hover:text-omarchy-cream"
              >
                Read manual
              </a>
              <a
                href="https://github.com/basecamp/omarchy"
                target="_blank"
                rel="noreferrer"
                className="font-inter text-[13px] uppercase tracking-[0.18em] text-lambda-ink transition-colors hover:text-omarchy-cream"
              >
                Source code
              </a>
            </div>
          </div>
        <div className="flex flex-col gap-4">
          {ABOUT_POINTS.map((p, i) => (
              <div className="rounded-3xl border border-black bg-neutral-950 p-6 transition-colors duration-300 hover:border-omarchy-cream/40">
                <div className="mb-3 flex items-center justify-between font-inter text-[13px] uppercase tracking-[0.18em]">
                  <span className="text-white">{p.index}</span>
                </div>
                <p className="text-sm normal-case tracking-normal leading-relaxed text-lambda-dim">
                  {p.body}
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
