"use client"

import React, { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface InviteModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (email: string) => void
  storedEmail?: string
}

export function InviteModal({ open, onClose, onSuccess, storedEmail }: InviteModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    if (storedEmail && storedEmail === email) {
      toast.info("You are already on the invite list.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        const message = typeof payload?.error === "string" ? payload.error : "Unable to submit email."
        throw new Error(message)
      }

      onSuccess(email)
      setEmail("")
      onClose()
      toast.success("Invite request received.")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Escape key to close
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, handleKeyDown])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className="relative flex flex-col w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ filter: "drop-shadow(0 20px 20px rgb(0 0 0 / 0.15))" }}
          >
            {/* Top Image Section - separate distinct container */}
            <div className="relative w-full z-20">
               <img 
                src="/invite.webp" 
                alt="Invite background" 
                fetchPriority="high"
                className="w-full h-auto select-none pointer-events-none block"
                draggable={false}
              />
            </div>

            {/* Bottom Form Section - coming from back */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", damping: 20, stiffness: 200 }}
              className="w-full -mt-6 pb-8 px-4.5 pr-5 rounded-b-3xl z-10 relative"
            >
              <div className="w-full bg-background space-y-6 p-6 md:p-8 rounded-b-3xl rounded-t-lg"> 
               <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-2">
                  <input
                    id="invite-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@domain.com"
                    className="py-2.5 w-full rounded-xl border border-input bg-muted/30 px-4 text-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20 text-center"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all active:scale-95 py-5 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Adding you...
                    </>
                  ) : (
                    "Get Navi"
                  )}
                </Button>
              </form>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
