import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Navbar from './Navbar'
import heroBg from '../assets/hero-bg.mp4'

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  style?: CSSProperties
}

export const WordsPullUp = ({
  text,
  className = '',
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                *
              </span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  style?: CSSProperties
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = '',
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words: { word: string; className?: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------------- Hero ---------------- */
const OmarchyHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Half-speed playback (playbackRate is JS-only and some browsers reset it
  // before metadata loads, so set it both on mount and on metadata load).
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5
  }, [])

  return (
    <section className="h-full w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 0.5
          }}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroBg}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Prebuilt navbar (from ../omarchy-navbar) — no default navbar here */}
        <Navbar />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 sm:px-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <h1
                className="whitespace-nowrap font-inter font-medium leading-[0.85] tracking-[-0.07em] text-[19vw] sm:text-[19vw] md:text-[18vw] lg:text-[12vw] xl:text-[11.5vw] 2xl:text-[12vw] pb-[0.06em]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Omarchy" />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-1 lg:col-span-4 lg:pb-2">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-inter text-xs text-[#E1E0CC]/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                Beautiful, fun &amp; agentic Linux by DHH. An opinionated Arch +
                Hyprland distro — gorgeous on first boot, malleable for the age
                of agents.
              </motion.p>

              <motion.a
                href="#download"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1 pl-5 pr-1 font-inter text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
              >
                Get the ISO
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { OmarchyHero }
