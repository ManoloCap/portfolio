import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-pink-500/60 text-white">
      <div className="mx-16 pb-3 gap-8 flex flex-col md:flex-row md:justify-between items-center">
        <Link className="flex items-center text-pink-200 " href="/">
          <Logo model="footer" className="max-w-[6rem]" />
        </Link>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-pink-200" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
