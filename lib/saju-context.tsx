"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"

export type PageType = "input" | "result" | "chat"

export interface UserInfo {
  birthDate: string // YYYYMMDD
  birthHour: string // 00-23
  gender: "male" | "female"
}

export interface FortuneResult {
  today: string
  wealth: string
  love: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface SajuContextType {
  currentPage: PageType
  userInfo: UserInfo | null
  fortuneResult: FortuneResult | null
  chatMessages: ChatMessage[]
  isLoading: boolean
  setCurrentPage: (page: PageType) => void
  setUserInfo: (info: UserInfo) => void
  setFortuneResult: (result: FortuneResult) => void
  addChatMessage: (message: ChatMessage) => void
  setChatMessages: (messages: ChatMessage[]) => void
  setIsLoading: (loading: boolean) => void
  resetAll: () => void
}

const SajuContext = createContext<SajuContextType | undefined>(undefined)

export function SajuProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>("input")
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message])
  }

  const resetAll = () => {
    setCurrentPage("input")
    setUserInfo(null)
    setFortuneResult(null)
    setChatMessages([])
    setIsLoading(false)
  }

  return (
    <SajuContext.Provider
      value={{
        currentPage,
        userInfo,
        fortuneResult,
        chatMessages,
        isLoading,
        setCurrentPage,
        setUserInfo,
        setFortuneResult,
        addChatMessage,
        setChatMessages,
        setIsLoading,
        resetAll,
      }}
    >
      {children}
    </SajuContext.Provider>
  )
}

export function useSaju() {
  const context = useContext(SajuContext)
  if (context === undefined) {
    throw new Error("useSaju must be used within a SajuProvider")
  }
  return context
}

