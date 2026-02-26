"use client"

import { useEffect, useState } from "react"
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

  return (
    <div className="max-w-4xl w-full mx-auto py-2 md:py-4 px-4 bg-background flex flex-col gap-5 border border-t-0 border-dashed">
      <section id="hero" className="relative">
      <img src="/hero_ukiyo.webp" alt="navi_hero_ukiyo" className="w-full h-fit"/>
      {/* <span className="absolute top-8 left-10">{thingy[0]} personal agentic system {thingy[1]}</span> */}
      </section>
      <section id="hero-text" className="px-4 flex flex-col gap-2">
      <p className="text-2xl md:text-3xl font-bold">Built to make your life easier.  <span className="font-semibold text-foreground/50 text-2xl md:text-3xl">{thingy[0]} personal agentic system {thingy[1]}</span></p>
      <p className="text-2xl md:text-2xl font-semibold text-foreground/30">Part of Project Apotheosis.</p>
      <div className="pt-2">
        {storedEmail ? (
          <div className="grid gap-2">
            <Button className="bg-foreground text-background text-lg" size="lg" disabled>
              Invite requested
            </Button>
            <p className="text-xs text-muted-foreground">Already on the list as {storedEmail}.</p>
          </div>
        ) : (
          <>
            <Button
              className="bg-foreground text-background text-lg px-4 py-5"
              size="lg"
              onClick={() => setOpen(true)}
            >
              Get an invite
            </Button>
            <InviteModal 
              open={open} 
              onClose={() => setOpen(false)} 
              onSuccess={handleSuccess}
              storedEmail={storedEmail}
            />
          </>
        )}
      </div>
      </section>
    </div>
  );
}
