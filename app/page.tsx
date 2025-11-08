"use client"

import { SajuProvider, useSaju } from "@/lib/saju-context"
import { PageInput } from "@/components/page-input"
import { PageResult } from "@/components/page-result"
import { PageChat } from "@/components/page-chat"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"

function SajuApp() {
  const { currentPage } = useSaju()

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <main className="min-h-screen h-screen overflow-hidden bg-background flex items-center justify-center">
      <AnimatePresence mode="wait">
        {currentPage === "input" && (
          <motion.div
            key="input"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center p-4"
          >
            <PageInput />
          </motion.div>
        )}
        {currentPage === "result" && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center p-4 overflow-y-auto"
          >
            <PageResult />
          </motion.div>
        )}
        {currentPage === "chat" && (
          <motion.div
            key="chat"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            <PageChat />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function Home() {
  return (
    <SajuProvider>
      <SajuApp />
      <Toaster />
    </SajuProvider>
  )
}
