import type { ComponentProps } from 'react'
import { PlusIcon } from 'lucide-react'
import { Reveal } from './Sections'

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = ComponentProps<'div'>

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        'relative grid grid-cols-2 border-x border-lambda-line md:grid-cols-4',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-lambda-line" />

      <LogoCard
        className="relative border-r border-b border-lambda-line bg-[#0b0b0b]"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg',
          alt: 'Nvidia Logo',
        }}
      >
        <PlusIcon
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-lambda-dim"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-lambda-line bg-black md:border-r"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg',
          alt: 'Supabase Logo',
        }}
      />

      <LogoCard
        className="relative border-r border-b border-lambda-line bg-black md:bg-[#0b0b0b]"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg',
          alt: 'GitHub Logo',
        }}
      >
        <PlusIcon
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-lambda-dim"
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 text-lambda-dim md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b border-lambda-line bg-[#0b0b0b] md:bg-black"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg',
          alt: 'OpenAI Logo',
        }}
      />

      <LogoCard
        className="relative border-r border-b border-lambda-line bg-[#0b0b0b] md:border-b-0 md:bg-black"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg',
          alt: 'Turso Logo',
        }}
      >
        <PlusIcon
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-lambda-dim md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-lambda-line bg-black md:border-r md:border-b-0 md:bg-[#0b0b0b]"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg',
          alt: 'Clerk Logo',
        }}
      />

      <LogoCard
        className="border-r border-lambda-line bg-black"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg',
          alt: 'Claude AI Logo',
        }}
      />

      <LogoCard
        className="bg-[#0b0b0b]"
        logo={{
          src: 'https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg',
          alt: 'Vercel Logo',
        }}
      />

      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-lambda-line" />
    </div>
  )
}

type LogoCardProps = ComponentProps<'div'> & {
  logo: Logo
}

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-black px-4 py-8 md:p-8',
        className,
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 select-none brightness-0 invert md:h-5"
        height={logo.height || 'auto'}
        src={logo.src}
        width={logo.width || 'auto'}
      />
      {children}
    </div>
  )
}

export function Sponsors() {
  return (
    <section className="overflow-x-clip border-y border-lambda-line bg-[#0b0b0b]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20">
          <h2 className="mb-10 text-center font-inter text-2xl font-medium tracking-tight text-lambda-ink md:text-4xl">
            Independent, patron-funded.
          </h2>
          <LogoCloud />
          <p className="mt-8 text-center font-inter text-[13px] uppercase tracking-[0.18em] text-lambda-dim">
            <a
              href="https://omarchy.org"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-omarchy-cream"
            >
              Become a sponsor
            </a>
          </p>
      </div>
    </section>
  )
}
