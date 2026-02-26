"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InviteModal } from "@/components/invite-modal"

export default function Home() {
  const thingy = "{}"
  const [open, setOpen] = useState(false)
  const [storedEmail, setStoredEmail] = useState("")

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

  const ease = [0.22, 1, 0.36, 1] as const

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
    <motion.div 
      className="max-w-4xl w-full mx-auto py-4 md:py-4 px-4 bg-background flex flex-col gap-5 border border-t-0 border-dashed"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section id="hero" className="relative" variants={itemVariants}>
        <img src="/hero_ukiyo.webp" alt="navi_hero_ukiyo" className="w-full h-fit"/>
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
              className="grid gap-2"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: ease }}
            >
              <Button className="bg-foreground text-background text-lg px-4 py-5 w-fit" size="lg" disabled>
                Invite requested
              </Button>
              <p className="text-xs text-muted-foreground">{thingy[0]} Already on the list as {storedEmail}. {thingy[1]}</p>
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
  );
}
