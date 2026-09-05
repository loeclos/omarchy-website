import { Reveal } from './Sections'

interface FeaturedPost {
  title: string
  description: string
  tags: string[]
  date: string
  href: string
}

// Static snapshot mirroring src/hooks/useNews.ts shape.
const FEATURED_NEWS: FeaturedPost[] = [
  {
    title: 'Omarchy 4.0: a brand-new desktop shell',
    description: 'Quickshell-powered shell, widgets, and smoother HiDPI everywhere.',
    tags: ['Release', 'Desktop'],
    date: 'Aug 2026',
    href: 'https://github.com/basecamp/omarchy/releases',
  },
  {
    title: 'The Omacom Foundation launches',
    description: 'Millions in patron funding to keep independent Linux thriving.',
    tags: ['Foundation', 'Funding'],
    date: 'Aug 2026',
    href: 'https://omarchy.org',
  },
  {
    title: 'Omarchy 3.7 overhauls gaming support',
    description: 'Proton, Steam, and a unified CLI for play after work.',
    tags: ['Release', 'Gaming'],
    date: 'May 2026',
    href: 'https://github.com/basecamp/omarchy/releases',
  },
  {
    title: 'Beautiful systems win and this is why that matters more than ever',
    description: 'Motivation is downstream of beauty — the philosophy behind Omarchy.',
    tags: ['Essay', 'DHH'],
    date: 'Apr 2026',
    href: 'https://world.hey.com/dhh',
  },
  {
    title: 'The Omarchy Manual is live',
    description: 'The authoritative guide to every corner of the system.',
    tags: ['Docs', 'Guide'],
    date: 'Mar 2026',
    href: 'https://learn.omacom.io/2/the-omarchy-manual',
  },
  {
    title: 'Vibe your way through the OS: agentic workflows in Omarchy',
    description: 'Plain-text config your agent can read, diff, and reshape.',
    tags: ['AI', 'Agents'],
    date: 'Nov 2025',
    href: 'https://omarchy.org',
  },
]

export function NewsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-inter text-3xl font-medium tracking-tight text-lambda-ink md:text-5xl">
              Dispatches from Omarchy.
            </h2>
          </div>
          <a
            href="https://github.com/basecamp/omarchy/releases"
            target="_blank"
            rel="noreferrer"
            className="font-inter text-[13px] uppercase tracking-[0.18em] text-lambda-ink decoration-lambda-line underline-offset-4 transition-colors hover:text-omarchy-cream"
          >
            All posts
          </a>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_NEWS.map((post, i) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-3xl border border-black lambda-line bg-neutral-950 p-6 no-underline transition-colors duration-300 hover:border-omarchy-cream/40"
          >
            <div className="mb-3 flex items-center justify-between font-instrument text-[13px] uppercase tracking-[0.18em]">
              <span className="text-lambda-dim font-inter">{post.date}</span>
            </div>
            <h3 className="mb-2 text-base normal-case tracking-normal leading-snug text-lambda-ink">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 flex-1 text-sm normal-case tracking-normal leading-relaxed text-lambda-dim">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-lambda-line px-2.5 py-0.5 font-inter text-[12px] uppercase tracking-[0.12em] text-lambda-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
