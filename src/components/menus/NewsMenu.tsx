import { useRef, useState } from 'react'
import type { useNews } from '../../hooks/useNews'

type NewsApi = ReturnType<typeof useNews>

interface NewsMenuProps {
  api: NewsApi
}

/* Title truncates with "..." by default; on hover — only when the text
   actually overflows — it swaps to a seamless duplicated-text loop. */
function NewsTitle({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [loop, setLoop] = useState(false)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden whitespace-nowrap"
      onMouseEnter={() => {
        const c = containerRef.current
        const t = textRef.current
        setLoop(!!c && !!t && t.scrollWidth > c.clientWidth)
      }}
      onMouseLeave={() => setLoop(false)}
    >
      <span
        ref={textRef}
        className={`block truncate text-[14px] font-medium tracking-[0.02em] normal-case transition-colors duration-200 group-hover:text-black ${
          loop ? 'invisible' : ''
        }`}
      >
        {title}
      </span>
      {loop && (
        <span className="title-loop-track absolute inset-0 flex w-max items-center text-[14px] font-medium tracking-[0.02em] normal-case transition-colors duration-200 group-hover:text-black">
          <span className="pr-10">{title}</span>
          <span className="pr-10" aria-hidden="true">
            {title}
          </span>
        </span>
      )}
    </div>
  )
}

export function NewsMenu({ api }: NewsMenuProps) {
  const { visible } = api

  return (
    <div className="font-inter normal-case">
      <ul className="m-0 max-h-[46vh] list-none overflow-y-auto px-0 py-[14px]">
        {visible.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block px-[18px] py-2 no-underline transition-colors duration-200 hover:bg-lambda-cream"
            >
              <NewsTitle title={p.title} />
              <div className="text-[11px] tracking-[0.1em] text-lambda-dim transition-colors duration-200 group-hover:text-black/60">
                {p.date}
              </div>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://discord.gg/tXFUdasqhY"
        target="_blank"
        rel="noreferrer"
        className="block border-t border-lambda-line px-[18px] py-2 text-center font-inter text-[10px] uppercase tracking-[0.18em] text-white no-underline transition-colors duration-200 hover:bg-lambda-cream hover:text-black"
      >
        Join the community -&gt;
      </a>
    </div>
  )
}
