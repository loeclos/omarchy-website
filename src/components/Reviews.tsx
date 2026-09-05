import { Reveal } from './Sections'

const REVIEWS = [
  {
    quote: 'Installed on a ThinkPad in 10 minutes. First Linux that felt finished on boot.',
    author: 'MARCUS L.',
    role: 'Backend dev, ex-macOS',
  },
  {
    quote: 'Hyprland without the week of config hell. The keybinds just make sense.',
    author: 'PRIYA S.',
    role: 'Neovim enjoyer',
  },
  {
    quote: 'My agent edits my OS like a repo. ~/.config diffs are the killer feature.',
    author: 'TOM W.',
    role: 'AI engineer',
  },
  {
    quote: 'Themes are unreal. One command and the whole desktop flips vibe.',
    author: 'ANA R.',
    role: 'Designer who codes',
  },
  {
    quote: 'Gaming + tiling + HiDPI on a laptop. Did not expect all three to work.',
    author: 'JONAS K.',
    role: 'Framework 16 owner',
  },
  {
    quote: 'It made Arch boring — in the best way. Update and get back to work.',
    author: 'SOFIA M.',
    role: 'Omarch since 1.0',
  },
]

export function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-inter text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-lambda-ink">Loved by </span>
            <span className="text-omarchy-cream">Omarchs.</span>
          </h2>
          <a
            href="https://discord.gg/tXFUdasqhY"
            target="_blank"
            rel="noreferrer"
            className="font-inter text-[13px] uppercase tracking-[0.18em] text-lambda-ink transition-colors hover:text-omarchy-cream"
          >
            Join Discord
          </a>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.author} delay={(i % 3) * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl border border-black bg-neutral-950 p-6 transition-colors duration-300 hover:border-omarchy-cream/40">
              <span className="mb-4 font-inter text-2xl leading-none text-white">
                &ldquo;
              </span>
              <blockquote className="mb-6 flex-1 text-sm normal-case tracking-normal leading-relaxed text-lambda-ink">
                {r.quote}
              </blockquote>
              <figcaption className="border-t border-lambda-line pt-4 font-inter text-[12px] uppercase tracking-[0.14em]">
                <div className="text-lambda-ink">{r.author}</div>
                <div className="mt-1 normal-case tracking-normal text-lambda-dim">
                  {r.role}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
