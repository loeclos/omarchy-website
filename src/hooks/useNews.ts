export interface NewsPost {
  title: string
  description: string
  tags: string[]
  date: string
  href: string
}

const MANUAL = 'https://learn.omacom.io/2/the-omarchy-manual'
const RELEASES = 'https://github.com/basecamp/omarchy/releases'
const BLOG = 'https://world.hey.com/dhh'

const POSTS: NewsPost[] = [
  { title: 'Omarchy is out', description: 'DHH ships his opinionated Arch + Hyprland setup to the world.', tags: ['Launch', 'DHH'], date: 'Jun 2025', href: 'https://world.hey.com/dhh/omarchy-is-out-4666dd31' },
  { title: 'Omarchy 4.0: a brand-new desktop shell', description: 'Quickshell-powered shell, widgets, and smoother HiDPI everywhere.', tags: ['Release', 'Desktop'], date: 'Aug 2026', href: RELEASES },
  { title: 'The Omacom Foundation launches', description: 'Millions in patron funding to keep independent Linux thriving.', tags: ['Foundation', 'Funding'], date: 'Aug 2026', href: 'https://omarchy.org' },
  { title: 'Omarchy 3.7 overhauls gaming support', description: 'Proton, Steam, and a unified CLI for play after work.', tags: ['Release', 'Gaming'], date: 'May 2026', href: RELEASES },
  { title: 'Beautiful systems win and this is why that matters more than ever', description: 'Motivation is downstream of beauty — the philosophy behind Omarchy.', tags: ['Essay', 'DHH'], date: 'Apr 2026', href: BLOG },
  { title: 'The Omarchy Manual is live', description: 'The authoritative guide to every corner of the system.', tags: ['Docs', 'Guide'], date: 'Mar 2026', href: MANUAL },
  { title: 'Dual-booting Omarchy alongside Windows without wiping your disk', description: 'Manual partitioning, EFI fixes, and bootloader choices explained.', tags: ['Guide', 'Windows'], date: 'Feb 2026', href: MANUAL },
  { title: 'Coming from macOS or Windows: a two-week migration plan', description: 'App replacements, keymaps, and tiling survival tips.', tags: ['Guide', 'Migration'], date: 'Jan 2026', href: MANUAL },
  { title: 'Make it yours: switching themes with one single command', description: 'Twelve curated themes, zero config spelunking required.', tags: ['Themes', 'Guide'], date: 'Dec 2025', href: 'https://github.com/basecamp/omarchy' },
  { title: 'Vibe your way through the OS: agentic workflows in Omarchy', description: 'Plain-text config your agent can read, diff, and reshape.', tags: ['AI', 'Agents'], date: 'Nov 2025', href: 'https://omarchy.org' },
  { title: 'Community showcase: rices, dotfiles, and battlestations', description: 'The wildest setups Omarchs have shared this month.', tags: ['Community'], date: 'Oct 2025', href: 'https://discord.gg/tXFUdasqhY' },
]

export function useNews() {
  const reset = () => {}

  return {
    visible: POSTS,
    reset,
  }
}
