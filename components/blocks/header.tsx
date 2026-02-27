"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { TextScramble } from "@/components/ui/text-scramble"

export default function Header() {
  const [isTrigger, setIsTrigger] = useState(false);

  return (
    <header className="w-full border-0 border-t-0">
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto pt-3 md:pt-5 pb-4 md:pb-6 px-6 md:px-8 border border-t-0 border-dashed">
        <div className="flex items-center gap-4 md:gap-6">
          <ThemeSwitcher />
          <Link 
            href="/features" 
            className="text-md font-semibold md:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            features
          </Link>
        </div>
        <motion.p 
          layoutId="navi-logo-text"
          className="text-3xl md:text-4xl text-muted-foreground tracking-tighter font-bold relative z-10"
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Link 
            href="/" 
            className="cursor-pointer"
            onMouseEnter={() => setIsTrigger(true)}
          >
            <TextScramble
              as="span" 
              characterSet=". / ; [ ] { } < > _ -"
              trigger={isTrigger}
              onScrambleComplete={() => setIsTrigger(false)}
            >
              navi
            </TextScramble>
          </Link>
        </motion.p>
      </div>
    </header>
  );
}
