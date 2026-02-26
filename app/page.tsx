"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InviteModal } from "@/components/invite-modal"
import { TextScramble } from "@/components/ui/text-scramble"
import Header from "@/components/blocks/header"

export default function Home() {
  const thingy = "{}"
  const [open, setOpen] = useState(false)
  const [storedEmail, setStoredEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const existingEmail = window.localStorage.getItem("inviteEmail") ?? ""
    if (existingEmail) {
      setStoredEmail(existingEmail)
    }
  }, [])

  const handleSuccess = (email: string) => {
    window.localStorage.setItem("inviteEmail", email)
    setStoredEmail(email)
  }

  const ease = [0.16, 1, 0.3, 1] as const

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: ease,
      },
    },
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div 
            className="absolute inset-0 bg-background"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeOut" } }}
          />
          <motion.p
            layoutId="navi-logo-text"
            className="text-3xl md:text-4xl font-bold tracking-tighter relative z-10 text-muted-foreground"
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TextScramble
              as="span"
              characterSet=". / ; [ ] { } < > _ -"
              onScrambleComplete={() => setTimeout(() => setIsLoading(false), 600)}
            >
              navi
            </TextScramble>
          </motion.p>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          className="w-full flex flex-col items-center h-screen"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Header />
          <motion.div 
            className="max-w-4xl w-full h-full mx-auto py-4 md:py-4 px-4 bg-background flex flex-col gap-5 border border-t-0 border-dashed"
            variants={containerVariants}
          >
            <motion.section id="hero" className="relative" variants={itemVariants}>
              <img src="/hero_ukiyo.webp" fetchPriority="high" alt="navi_hero_ukiyo" className="w-full h-fit"/>
              {/* <span className="absolute top-8 left-10">{thingy[0]} personal agentic system {thingy[1]}</span> */}
            </motion.section>
            
            <motion.section 
              id="hero-text" 
              className="px-3 md:px-4 flex flex-col gap-2"
              variants={containerVariants}
            >
              <motion.p className="text-2xl md:text-3xl font-bold text-balance" variants={itemVariants}>
                Built to make your life easier. <span className="font-semibold text-foreground/50 text-2xl md:text-3xl">{thingy[0]} personal agentic system {thingy[1]}</span>
              </motion.p>
              <motion.p className="text-xl md:text-2xl font-semibold text-foreground/30" variants={itemVariants}>
                Part of Project Apotheosis.
              </motion.p>
              <motion.div className="pt-2" variants={itemVariants}>
                {storedEmail ? (
                  <motion.div 
                    className="flex flex-col md:flex-row items-start md:items-center gap-4"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease: ease }}
                  >
                    <Button className="bg-foreground text-background text-lg px-4 py-5 w-fit" size="lg" disabled>
                      Invite requested
                    </Button>
                    <div className="flex items-center gap-2 pb-1">
                      <p className="text-4xl text-foreground/20 font-light">{thingy[0]}</p>
                      <p className="text-xs text-muted-foreground text-center leading-tight">
                        Already on the list as <br/> 
                        <span className="font-medium text-foreground">{storedEmail}</span>
                      </p>
                      <p className="text-4xl text-foreground/20 font-light">{thingy[1]}</p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
                      <Button
                        className="bg-foreground text-background text-lg px-4 py-5"
                        size="lg"
                        onClick={() => setOpen(true)}
                      >
                        Get an invite;
                      </Button>
                    </motion.div>
                    <InviteModal 
                      open={open} 
                      onClose={() => setOpen(false)} 
                      onSuccess={handleSuccess}
                      storedEmail={storedEmail}
                    />
                  </>
                )}
              </motion.div>
            </motion.section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
