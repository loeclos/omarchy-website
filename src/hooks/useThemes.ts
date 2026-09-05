export interface OmarchyTheme {
  name: string
  style: string
  description: string
  swatches: string[]
  href: string
}

const GITHUB = 'https://github.com/basecamp/omarchy'

const THEMES: OmarchyTheme[] = [
  { name: 'Tokyo Night', style: 'Dark / Neon', description: 'Electric blues and purples on a deep stormy base.', swatches: ['#1a1b26', '#7aa2f7', '#bb9af7'], href: GITHUB },
  { name: 'Catppuccin', style: 'Dark / Pastel', description: 'Soothing pastel hues with a cozy mocha base.', swatches: ['#1e1e2e', '#cba6f7', '#89b4fa'], href: GITHUB },
  { name: 'Catppuccin Latte', style: 'Light / Pastel', description: 'The pastel favorite, inverted for daylight.', swatches: ['#eff1f5', '#8839ef', '#209fb5'], href: GITHUB },
  { name: 'Everforest', style: 'Dark / Nature', description: 'Soft greens inspired by forest canopies.', swatches: ['#2d353b', '#a7c080', '#7fbbb3'], href: GITHUB },
  { name: 'Flexoki', style: 'Dark / Warm', description: 'Warm paper tones with an ink-black edge.', swatches: ['#100f0f', '#d14d41', '#4385be'], href: GITHUB },
  { name: 'Gruvbox', style: 'Dark / Retro', description: 'Retro groove contrasts that never get old.', swatches: ['#282828', '#fabd2f', '#83a598'], href: GITHUB },
  { name: 'Kanagawa', style: 'Dark / Wave', description: 'Muted waves and ink inspired by the great wave.', swatches: ['#1f1f28', '#7e9cd8', '#957fb8'], href: GITHUB },
  { name: 'Matte Black', style: 'Dark / Mono', description: 'Pure blacks, zero distractions, all focus.', swatches: ['#000000', '#5a5a58', '#e1e0cc'], href: GITHUB },
  { name: 'Nord', style: 'Dark / Frost', description: 'Arctic frost blues for calm, cold focus.', swatches: ['#2e3440', '#88c0d0', '#81a1c1'], href: GITHUB },
  { name: 'Osaka Jade', style: 'Dark / Green', description: 'Neon jade glowing through midnight streets.', swatches: ['#0f1e1e', '#1ce97c', '#e1e0cc'], href: GITHUB },
  { name: 'Ristretto', style: 'Dark / Coffee', description: 'Espresso browns and crema for slow mornings.', swatches: ['#2c2525', '#d4a373', '#a3b18a'], href: GITHUB },
  { name: 'Rose Pine', style: 'Dark / Rosy', description: 'Rosy dawns over a moonlit pine base.', swatches: ['#191724', '#eb6f92', '#9ccfd8'], href: GITHUB },
]

export function useThemes() {
  const reset = () => {}

  return {
    visible: THEMES,
    reset,
  }
}
