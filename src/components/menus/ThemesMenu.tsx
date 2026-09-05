import { Triangle } from 'lucide-react'
import type { useThemes } from '../../hooks/useThemes'

type ThemesApi = ReturnType<typeof useThemes>

interface ThemesMenuProps {
  api: ThemesApi
  hovered: string | null
  onHover: (label: string | null) => void
}

export function ThemesMenu({ api, hovered, onHover }: ThemesMenuProps) {
  const { visible } = api

  return (
    <div className="font-inter normal-case">
      <ul className="m-0 max-h-[46vh] list-none overflow-y-auto px-0 py-[14px]">
        {visible.map((t) => {
          const active = hovered === t.name
          return (
            <li key={t.name}>
              <a
                href={t.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => onHover(t.name)}
                className={`flex w-full items-center justify-start gap-2 whitespace-nowrap px-[18px] py-[2px] text-[14px] leading-[1.4] tracking-[0.04em] no-underline transition-colors duration-200 ${
                  active ? 'bg-lambda-cream text-black' : 'text-lambda-ink'
                }`}
              >
                <Triangle
                  size={9}
                  className={`shrink-0 rotate-90 fill-black text-black transition-opacity duration-200 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span className="flex shrink-0 -space-x-1">
                  {t.swatches.map((c) => (
                    <span
                      key={c}
                      className="h-3.5 w-3.5 rounded-full border border-black/40"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                <span className="flex-1 truncate text-left">{t.name}</span>
                <Triangle
                  size={9}
                  className={`shrink-0 -rotate-90 fill-black text-black transition-opacity duration-200 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ul>

      <a
        href="https://github.com/basecamp/omarchy"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => onHover(null)}
        className="block border-t border-lambda-line px-[18px] py-2 text-center font-inter text-[10px] uppercase tracking-[0.18em] text-white no-underline transition-colors duration-200 hover:bg-lambda-cream hover:text-black"
      >
        Browse all themes -&gt;
      </a>
    </div>
  )
}
