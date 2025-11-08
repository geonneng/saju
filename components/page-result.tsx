"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, TrendingUp, Heart, MessageCircle, RotateCcw } from "lucide-react"
import { useSaju } from "@/lib/saju-context"

export function PageResult() {
  const { fortuneResult, setCurrentPage, resetAll } = useSaju()

  if (!fortuneResult) {
    return null
  }

  const fortunes = [
    {
      title: "오늘의 운세",
      icon: Sun,
      content: fortuneResult.today,
      color: "text-yellow-400",
    },
    {
      title: "재물운",
      icon: TrendingUp,
      content: fortuneResult.wealth,
      color: "text-green-400",
    },
    {
      title: "애정운",
      icon: Heart,
      content: fortuneResult.love,
      color: "text-pink-400",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">✨ 당신의 운세 분석 결과</h1>
        <p className="text-muted-foreground">AI가 분석한 당신의 운명을 확인해보세요</p>
      </div>

      {/* Fortune Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fortunes.map((fortune, index) => {
          const Icon = fortune.icon
          return (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className={`w-5 h-5 ${fortune.color}`} />
                  <span className="text-foreground">{fortune.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {fortune.content}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button
          onClick={() => setCurrentPage("chat")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          AI에게 질문하기
        </Button>
        <Button
          onClick={resetAll}
          variant="outline"
          className="border-border hover:bg-secondary/50 text-foreground font-medium py-6 text-lg"
          size="lg"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          정보 다시 입력
        </Button>
      </div>
    </div>
  )
}

