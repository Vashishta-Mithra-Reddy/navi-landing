"use client"

import { motion } from "framer-motion"
import Header from "@/components/blocks/header"
import { TextScramble } from "@/components/ui/text-scramble"

const features = [
  {
    title: "AI Assistant",
    description: "The connective layer across the app. It answers questions, teaches new topics, and helps you plan your day or week.",
    icon: "{}"
  },
  {
    title: "Goals & Habits",
    description: "Capture clear goals with time horizons and define daily routines. Track progress and build consistency without pressure.",
    icon: "[]"
  },
  {
    title: "Journal & Reflection",
    description: "A safe space for reflection and insight. Write entries, tag moods, and review patterns to create clarity and intention.",
    icon: "<>"
  },
  {
    title: "Food & Nutrition",
    description: "Understand your energy and habits. Track meals, macros, and notes to see patterns over time.",
    icon: "()"
  },
  {
    title: "Memory",
    description: "Long-term context that grows with you. Capture important notes, preferences, and details so guidance improves over time.",
    icon: "**"
  },
  {
    title: "Integrations",
    description: "Connect with Google Workspace, GitHub, Vercel, and more so your life and work stay unified in one place.",
    icon: "++"
  }
]

export default function Features() {
  const ease = [0.16, 1, 0.3, 1] as const

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="w-full flex flex-col items-center min-h-screen bg-background text-foreground">
      <Header />
      
      <motion.main 
        className="max-w-4xl w-full mx-auto px-0 pb-16 pt-10 flex flex-col gap-0 border border-t-0 border-dashed min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section className="flex flex-col gap-4 px-8 pb-10" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            <TextScramble characterSet=". / ; [ ] { } < > _ -">
              features
            </TextScramble>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            navi is a personal guide and teacher built to help you grow with clarity, structure, and calm execution.
          </p>
        </motion.section>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 bg-background border-t border-dashed border-muted-foreground/20"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const isLastRow = index >= features.length - (features.length % 2 === 0 ? 2 : 1);
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index} 
                className={`flex flex-col gap-3 group bg-background p-8 border-dashed border-muted-foreground/20
                  ${!isLastRow ? "border-b" : ""}
                  ${isEven ? "md:border-r" : ""}
                `}
                variants={itemVariants}
              >
                <div className="text-3xl font-light text-muted-foreground/30 font-mono group-hover:text-foreground/80 transition-colors duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
          {features.length % 2 !== 0 && (
            <div className="bg-background border-dashed border-muted-foreground/20 hidden md:block" />
          )}
        </motion.div>

        <motion.section className="px-8 pt-10 border-t border-dashed" variants={itemVariants}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tighter">Philosophy</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Navi is built around growth, clarity, and calm execution. It aims to make progress feel achievable through small steps and reliable support. The assistant keeps your context in mind while each space gives you clear structure.
            </p>
          </div>
        </motion.section>
      </motion.main>
    </div>
  )
}
