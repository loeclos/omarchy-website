import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  Bot,
  Download,
  GitFork,
  MonitorSmartphone,
  Palette,
  Terminal,
  Zap,
} from 'lucide-react'
import { WordsPullUpMultiStyle } from './Hero'

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 28, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  {
    icon: Palette,
    title: 'Beautiful on first boot',
    body: 'Curated Hyprland setup, themes, lock screen, waybar, terminals — DHH’s daily rig, zero ricing required.',
  },
  {
    icon: Zap,
    title: 'Opinionated Arch',
    body: 'Rolling pacman + AUR with sane defaults. Everything you need for dev — Neovim, Alacritty, Chromium, Docker — preinstalled.',
  },
  {
    icon: Bot,
    title: 'Malleable for agents',
    body: 'Vibe your way through every tweak. Config lives in plain text; agents can read, diff, and reshape the whole OS.',
  },
  {
    icon: Terminal,
    title: 'Keyboard-first tiling',
    body: 'Hyprland tiling, workspaces, and keybinds that reward muscle memory. Manually editable, infinitely yours.',
  },
  {
    icon: MonitorSmartphone,
    title: 'HiDPI & laptop ready',
    body: 'Fractional scaling, dual-monitor layouts, power profiles, Wi-Fi/Bluetooth/VPN helpers that just work.',
  },
  {
    icon: GitFork,
    title: 'MIT-licensed & open',
    body: 'Fork it, theme it, upstream it. 38k+ stars, rolling releases, migrations handled by `omarchy update`.',
  },
]

export function Manifesto() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <WordsPullUpMultiStyle
        className="text-center font-inter text-3xl font-medium leading-[1.05] tracking-tight text-lambda-ink sm:text-4xl md:text-6xl"
        segments={[
          { text: 'An omakase distro.', className: 'text-lambda-ink' },
          {
            text: 'Opinionated Arch + Hyprland, gorgeous out of the box —',
            className: 'text-lambda-dim',
          },
          { text: 'yours to reshape.', className: 'text-omarchy-cream' },
        ]}
      />
    </section>
  )
}

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08}>
            <div className="group h-full rounded-3xl border border-black bg-[#0b0b0b] p-6 transition-colors duration-300 hover:border-omarchy-cream/40">
              <f.icon className="mb-5 h-5 w-5 text-dim" />
              <h3 className="mb-2 font-inter text-sm uppercase tracking-[0.08em] text-lambda-ink">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-lambda-dim">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Install() {
  return (
    <section id="download" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
      <Reveal>
        <div className="grid overflow-hidden rounded-2xl border border-lambda-line md:grid-cols-2 md:rounded-[2rem]">
          <div className="bg-neutral-950 p-8 md:p-12">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-lambda-ink md:text-5xl">
              Flash. Boot.
              <br />
              Become Omarch.
            </h2>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-lambda-dim md:text-base">
              Grab the ISO, flash it to USB, and boot into a complete developer
              environment. Your{' '}
              <code className="text-omarchy-cream">~/.config</code> always wins
              over defaults — tweaks survive updates.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://omarchy.org"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-omarchy-cream py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3"
              >
                <Download className="h-4 w-4" />
                Download ISO
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black font-instrument text-[10px] text-omarchy-cream">
                  4.0
                </span>
              </a>
              <a
                href="https://github.com/basecamp/omarchy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lambda-line px-5 py-2.5 text-sm text-lambda-ink transition-colors hover:border-omarchy-cream/50"
              >
                <GitFork className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-black p-8 font-lambda-mono text-[13px] leading-relaxed md:p-12">
            <div className="mb-3 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <pre className="overflow-x-auto text-lambda-ink">
              <code>
                <span className="text-lambda-dim"># flash the ISO, boot, then:</span>
                {'\n'}
                <span className="text-lambda-green">$</span> omarchy update
                {'\n'}
                <span className="text-lambda-green">$</span> omarchy theme
                {'  '}
                <span className="text-lambda-dim"># pick your vibe</span>
                {'\n'}
                <span className="text-lambda-green">$</span> nvim ~/.config/hypr/
                {'  '}
                <span className="text-lambda-dim"># make it yours</span>
              </code>
            </pre>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Stats() {
  const stats: [string, string][] = [
    ['38K+', 'GitHub stars'],
    ['4.0', 'Latest release'],
    ['8.7/10', 'DistroWatch rating'],
    ['MIT', 'Forever open'],
  ]
  return (
    <section className="border-t border-lambda-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-lambda-line px-4 sm:px-6 md:grid-cols-4 md:px-10">
        {stats.map(([v, l], i) => (
          <Reveal key={l} delay={i * 0.06} className="px-6 py-10 text-center">
            <div className="text-3xl font-medium tracking-tight text-omarchy-cream md:text-4xl">
              {v}
            </div>
            <div className="mt-2 font-instrument text-[11px] uppercase tracking-[0.18em] text-lambda-dim">
              {l}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-lambda-line bg-[#0b0b0b]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 font-instrument text-[11px] uppercase tracking-[0.14em] text-lambda-dim sm:flex-row sm:px-6 md:px-10">
        <span>
          Omarchy <span className="text-lambda-green">*</span> — by DHH
        </span>
        <div className="flex gap-6">
          <a href="https://omarchy.org" className="transition-colors hover:text-omarchy-cream">
            Site
          </a>
          <a
            href="https://github.com/basecamp/omarchy"
            className="transition-colors hover:text-omarchy-cream"
          >
            GitHub
          </a>
          <a href="#download" className="transition-colors hover:text-omarchy-cream">
            ISO
          </a>
        </div>
      </div>
    </footer>
  )
}
