import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Triangle } from 'lucide-react'
import { useThemes } from '../hooks/useThemes'
import { useNews } from '../hooks/useNews'
import { ThemesMenu } from './menus/ThemesMenu'
import { NewsMenu } from './menus/NewsMenu'

// Ported verbatim from ../omarchy-navbar/src/components/Navbar.jsx,
// re-skinned from Lambda labels to Omarchy labels. Animation logic untouched:
// the ONLY animated width is the outer pill; header + menu content stay static
// so links are never transformed by Motion.
interface MenuLink {
  label: string
  href: string
}

const MENU: { links: MenuLink[]; cta?: MenuLink }[] = [
  {
    links: [
      { label: 'INSTALL GUIDE', href: 'https://learn.omacom.io/2/the-omarchy-manual' },
      { label: 'DUAL BOOT', href: 'https://learn.omacom.io/2/the-omarchy-manual' },
    ],
    cta: { label: 'DOWNLOAD ISO', href: 'https://omarchy.org' },
  },
  {
    links: [
      { label: 'DEVELOPERS', href: 'https://github.com/basecamp/omarchy' },
      { label: 'CREATORS', href: 'https://omarchy.org' },
      { label: 'GAMING', href: 'https://omarchy.org' },
      { label: 'AI AGENTS', href: 'https://omarchy.org' },
    ],
  },
  {
    links: [
      { label: 'ARCH BASE', href: 'https://archlinux.org' },
      { label: 'HYPRLAND', href: 'https://hypr.land' },
      { label: 'THEMES', href: 'https://github.com/basecamp/omarchy' },
      { label: 'DOTFILES', href: 'https://github.com/basecamp/omarchy' },
      { label: 'TRUST & SECURITY', href: 'https://github.com/basecamp/omarchy' },
    ],
  },
  {
    links: [
      { label: 'MANUAL', href: 'https://learn.omacom.io/2/the-omarchy-manual' },
      { label: 'DOCUMENTATION', href: 'https://learn.omacom.io/2/the-omarchy-manual' },
      { label: 'BLOG', href: 'https://world.hey.com/dhh' },
      { label: 'COMMUNITY', href: 'https://discord.gg/tXFUdasqhY' },
    ],
  },
]

const MANUAL_LINK: MenuLink = {
  label: 'MANUAL',
  href: 'https://learn.omacom.io/2/the-omarchy-manual',
}

const MENU_LINKS = MENU.flatMap((col) => col.links)
const MENU_CTA = MENU.find((col) => col.cta)?.cta

type OpenMenu = 'omarchy' | 'themes' | 'news' | null

const MOBILE_MENU_MQ = '(max-width: 767px)'

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]

function MenuRow({
  label,
  href,
  active,
  onEnter,
}: {
  label: string
  href: string
  active: boolean
  onEnter: () => void
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={onEnter}
      className={`flex w-full items-center justify-start gap-2 px-[18px] py-1 md:py-[2px] text-[14px] tracking-[0.04em] leading-[1.4] whitespace-nowrap no-underline transition-colors duration-200 ${active ? 'bg-lambda-cream text-black' : 'text-lambda-ink'
        }`}
    >
      <Triangle
        size={9}
        className={`shrink-0 rotate-90 fill-black text-black transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <span className="flex-1 text-left">{label}</span>
      <Triangle
        size={9}
        className={`shrink-0 -rotate-90 fill-black text-black transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </a>
  )
}

function PillTrigger({
  label,
  active,
  onOpen,
  onToggle,
}: {
  label: string
  active: boolean
  onOpen: () => void
  onToggle: () => void
}) {
  return (
    <div className="flex items-center" onMouseEnter={onOpen}>
      <a
        href="#"
        aria-expanded={active}
        onClick={(e) => {
          e.preventDefault()
          onToggle()
        }}
        className={`whitespace-nowrap no-underline uppercase font-nav-mono tracking-[0.06em] text-xs sm:text-xs md:text-sm transition-colors duration-200 px-2.5 py-1 sm:px-2 sm:py-0.5 ${active
          ? 'bg-lambda-cream text-black'
          : 'bg-transparent text-[rgba(225,224,204,0.8)] hover:text-[#E1E0CC]'
          }`}
      >
        {label}
      </a>
    </div>
  )
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const themes = useThemes()
  const news = useNews()
  const [pillW, setPillW] = useState<number | null>(null)
  const [menuW, setMenuW] = useState<number | null>(null)
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRowRef = useRef<HTMLElement>(null)
  const menuInnerRef = useRef<HTMLDivElement>(null)
  const menuObserverRef = useRef<ResizeObserver | null>(null)

  const measure = useCallback(() => {
    if (headerRowRef.current) {
      const w = Math.ceil(headerRowRef.current.offsetWidth)
      setPillW((prev) => (prev === w ? prev : w))
    }
    if (menuInnerRef.current) {
      const w = Math.ceil(menuInnerRef.current.offsetWidth)
      setMenuW((prev) => (prev === w ? prev : w))
    }
  }, [])

  // Callback ref: re-measures when the mega-menu mounts late (AnimatePresence
  // mode="wait" defers its mount until the previous menu finishes exiting,
  // so the [openMenu] layout effect alone would see a null ref), and observes
  // it for responsive breakpoint changes while open.
  const setMenuInnerRef = useCallback(
    (el: HTMLDivElement | null) => {
      menuObserverRef.current?.disconnect()
      menuObserverRef.current = null
      menuInnerRef.current = el
      if (el) {
        measure()
        if (typeof ResizeObserver !== 'undefined') {
          const ro = new ResizeObserver(() => measure())
          ro.observe(el)
          menuObserverRef.current = ro
        }
      }
    },
    [measure],
  )

  useLayoutEffect(() => {
    measure()
  }, [openMenu, measure])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => { })
    }
    return () => {
      window.removeEventListener('resize', measure)
      menuObserverRef.current?.disconnect()
    }
  }, [measure])

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MENU_MQ)
    const update = () => setIsMobileMenu(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const switchMenu = (m: OpenMenu) => {
    cancelClose()
    setHovered(null)
    setOpenMenu(m)
    if (m === null) {
      themes.reset()
      news.reset()
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null)
      setHovered(null)
      themes.reset()
      news.reset()
    }, 150)
  }

  // The ONLY animated width in the navbar. The mega-menu expands wide,
  // themes/news stay exactly pill-width. Header + menu content are static
  // (no `layout` props anywhere), so links can never be transformed by Motion.
  const target =
    openMenu === 'omarchy' && !isMobileMenu
      ? (menuW ?? pillW ?? 'auto')
      : (pillW ?? 'auto')

  const linkCls =
    'whitespace-nowrap no-underline uppercase font-nav-mono tracking-[0.06em] text-xs sm:text-xs md:text-sm px-2.5 py-1 sm:px-2 sm:py-0.5 text-[rgba(225,224,204,0.8)] hover:bg-lambda-cream hover:text-black transition-colors duration-200'

  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex justify-center font-lambda-mono antialiased uppercase select-none"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <motion.div
        initial={false}
        animate={{ width: target }}
        transition={{ duration: 0.38, ease: EASE }}
        className="navbar-notch flex max-w-[min(1240px,96vw)] flex-col items-center overflow-hidden bg-omarchy-bg sm:max-w-[min(1240px,92vw)]"
      >
        {/* Static pill header — fixed intrinsic layout, never animated */}
        <nav
          ref={headerRowRef}
          aria-label="Primary"
          className="flex w-max items-center gap-4 px-5 py-3 font-nav-mono sm:gap-6 sm:px-4 sm:py-2 md:gap-12 md:px-8 lg:gap-14"
        >
          <a
            href={MANUAL_LINK.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => switchMenu(null)}
            className={linkCls}
          >
            {MANUAL_LINK.label}
          </a>
          <PillTrigger
            label="OMARCHY"
            active={openMenu === 'omarchy'}
            onOpen={() => switchMenu('omarchy')}
            onToggle={() => {
              setHovered(null)
              setOpenMenu((v) => (v === 'omarchy' ? null : 'omarchy'))
            }}
          />
          <PillTrigger
            label="THEMES"
            active={openMenu === 'themes'}
            onOpen={() => switchMenu('themes')}
            onToggle={() => {
              setHovered(null)
              setOpenMenu((v) => (v === 'themes' ? null : 'themes'))
            }}
          />
          <PillTrigger
            label="NEWS"
            active={openMenu === 'news'}
            onOpen={() => switchMenu('news')}
            onToggle={() => {
              setHovered(null)
              setOpenMenu((v) => (v === 'news' ? null : 'news'))
            }}
          />
        </nav>

        {/* Seamless attached menus — clipped curtain reveal.
            Mega-menu keeps its fixed inner width; themes/news fill pill width. */}
        <AnimatePresence initial={false} mode="wait">
          {openMenu === 'omarchy' && (
            <motion.div
              key="menu-omarchy"
              initial={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', height: 'auto' }}
              exit={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="w-full overflow-hidden border-t border-lambda-line"
              onMouseLeave={() => setHovered(null)}
            >
              {/* Mobile: single unified list + full-width CTA pinned to bottom */}
              <div className="w-full font-inter md:hidden">
                <ul className="m-0 flex list-none flex-col p-0 py-2">
                  {MENU_LINKS.map((l) => (
                    <li key={l.label}>
                      <MenuRow
                        label={l.label}
                        href={l.href}
                        active={hovered === l.label}
                        onEnter={() => setHovered(l.label)}
                      />
                    </li>
                  ))}
                </ul>
                {MENU_CTA && (
                  <div className="border-t border-lambda-line px-3 pb-3 pt-3">
                    <a
                      href={MENU_CTA.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setHovered(MENU_CTA.label)}
                      className={`block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-medium tracking-[0.08em] no-underline transition-colors duration-200 ${hovered === MENU_CTA.label
                        ? 'bg-lambda-pink text-black'
                        : 'bg-lambda-cream text-black'
                        }`}
                    >
                      {MENU_CTA.label}
                    </a>
                  </div>
                )}
              </div>

              {/* Desktop / tablet: multi-column mega-menu */}
              <div
                ref={setMenuInnerRef}
                className="mx-auto hidden w-max max-w-[min(1100px,88vw)] grid-cols-[1.05fr_1.35fr_1fr_1.4fr] bg-omarchy-bg font-inter max-[1100px]:grid-cols-2 max-[1100px]:overflow-x-auto md:grid"
              >
                {MENU.map((col, i) => (
                  <div
                    key={i}
                    className="flex min-h-[190px] flex-col border-r border-lambda-line py-[14px] last:border-r-0 max-[1100px]:min-h-0"
                  >
                    <ul className="m-0 flex list-none flex-col gap-0 p-0">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <MenuRow
                            label={l.label}
                            href={l.href}
                            active={hovered === l.label}
                            onEnter={() => setHovered(l.label)}
                          />
                        </li>
                      ))}
                    </ul>
                    {col.cta && (
                      <div className="mt-auto px-[10px] pt-4">
                        <a
                          href={col.cta.href}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={() => setHovered(col.cta?.label ?? null)}
                          className={`block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-medium tracking-[0.08em] no-underline transition-colors duration-200 ${hovered === col.cta.label
                            ? 'bg-lambda-pink text-black'
                            : 'bg-lambda-cream text-black'
                            }`}
                        >
                          {col.cta.label}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {openMenu === 'themes' && (
            <motion.div
              key="menu-themes"
              initial={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', height: 'auto' }}
              exit={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="w-full overflow-hidden border-t border-lambda-line bg-omarchy-bg"
            >
              <ThemesMenu api={themes} hovered={hovered} onHover={setHovered} />
            </motion.div>
          )}
          {openMenu === 'news' && (
            <motion.div
              key="menu-news"
              initial={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', height: 'auto' }}
              exit={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="w-full overflow-hidden border-t border-lambda-line bg-omarchy-bg"
            >
              <NewsMenu api={news} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
