"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Send, Loader2, Bot, User as UserIcon } from "lucide-react"
import { useSaju } from "@/lib/saju-context"
import { toast } from "sonner"

export function PageChat() {
  const { userInfo, chatMessages, addChatMessage, resetAll } = useSaju()
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 자동 스크롤
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [chatMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    // 사용자 메시지 추가
    addChatMessage({ role: "user", content: userMessage })

    try {
      // API 호출
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate: userInfo?.birthDate,
          birthHour: userInfo?.birthHour,
          gender: userInfo?.gender,
          message: userMessage,
          chatHistory: chatMessages,
        }),
      })

      if (!response.ok) {
        throw new Error("메시지 전송에 실패했습니다.")
      }

      const data = await response.json()
      addChatMessage({ role: "assistant", content: data.reply })
    } catch (error) {
      console.error("Error:", error)
      toast.error("메시지 전송 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">💬 AI 사주 상담</h1>
        <p className="text-muted-foreground">궁금한 점을 자유롭게 질문해보세요</p>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur flex flex-col overflow-hidden">
        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p>안녕하세요! 사주와 관련된 질문을 해주세요.</p>
                <p className="text-sm mt-2">예: "올해 이직운은 어때요?", "나의 성격적 장점은?"</p>
              </div>
            )}
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-secondary/50 text-foreground rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">답변을 생성하는 중...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="flex-1 bg-secondary/50 border-border text-foreground"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()} size="icon" className="h-10 w-10">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Back Button */}
      <div className="mt-4 text-center">
        <Button onClick={resetAll} variant="outline" className="border-border hover:bg-secondary/50">
          <Home className="mr-2 h-4 w-4" />
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

