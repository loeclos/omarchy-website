import { GitFork } from 'lucide-react'
import { Reveal } from './Sections'

const CONTRIBUTORS = [
  { initials: 'DH', name: 'DHH', handle: '@dhh', detail: 'Founder / omakase' },
  { initials: 'ST', name: 'STEVE T.', handle: '@steve', detail: 'Installer + ISO' },
  { initials: 'MK', name: 'MIKE K.', handle: '@mikek', detail: 'Hyprland defaults' },
  { initials: 'AL', name: 'ANA L.', handle: '@anal', detail: 'Themes x12' },
  { initials: 'JR', name: 'JULES R.', handle: '@julesr', detail: 'Waybar + shell' },
  { initials: 'KP', name: 'KIM P.', handle: '@kimp', detail: 'Docs + manual' },
  { initials: 'RB', name: 'RAVI B.', handle: '@ravib', detail: 'Gaming stack' },
  { initials: 'EO', name: 'ELENA O.', handle: '@elenao', detail: 'HiDPI + laptop' },
]

export function Contributors() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
        <div className="overflow-hidden rounded-2xl border border-lambda-line md:rounded-[2rem]">
          <div className="border-b border-lambda-line bg-[#0b0b0b] p-8 md:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-inter text-3xl font-medium tracking-tight text-lambda-ink md:text-5xl">
                Built in the open.
              </h2>
              <a
                href="https://github.com/basecamp/omarchy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lambda-line px-5 py-2.5 font-instrument text-[11px] uppercase tracking-[0.14em] text-lambda-ink transition-colors hover:border-omarchy-cream/50 hover:text-omarchy-cream"
              >
                <GitFork className="h-4 w-4" />
                38k+ stars
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-lambda-line bg-black max-sm:divide-y sm:grid-cols-4 sm:divide-x">
            {CONTRIBUTORS.map((c, i) => (
            <div
                key={c.handle}
                 className="flex flex-col items-center px-4 py-8 text-center transition-colors duration-300 hover:bg-[#0b0b0b]">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-lambda-line bg-[#0b0b0b] font-instrument text-xs tracking-[0.08em] text-omarchy-cream">
                    {c.initials}
                  </span>
                  <span className="font-instrument text-[11px] uppercase tracking-[0.14em] text-lambda-ink">
                    {c.name}
                  </span>
                  <span className="mt-1 font-instrument text-[11px] tracking-normal text-lambda-dim normal-case">
                    {c.handle}
                  </span>
                  <span className="mt-2 font-instrument text-[10px] uppercase tracking-[0.12em] text-lambda-dim/70">
                    {c.detail}
                  </span>
                </div>
            ))}
          </div>
        </div>
    </section>
  )
}
