"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Clock, User, Sparkles, Loader2 } from "lucide-react"
import { useSaju } from "@/lib/saju-context"
import { toast } from "sonner"

export function PageInput() {
  const { setUserInfo, setFortuneResult, setCurrentPage, setIsLoading, isLoading } = useSaju()
  const [birthDate, setBirthDate] = useState("")
  const [birthHour, setBirthHour] = useState("")
  const [gender, setGender] = useState("")

  const validateBirthDate = (date: string) => {
    if (date.length !== 8) return false
    const year = parseInt(date.substring(0, 4))
    const month = parseInt(date.substring(4, 6))
    const day = parseInt(date.substring(6, 8))

    if (year < 1900 || year > 2100) return false
    if (month < 1 || month > 12) return false
    if (day < 1 || day > 31) return false

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!birthDate || !birthHour || !gender) {
      toast.error("모든 정보를 입력해주세요.")
      return
    }

    if (!validateBirthDate(birthDate)) {
      toast.error("올바른 생년월일을 입력해주세요. (예: 19900101)")
      return
    }

    setIsLoading(true)

    try {
      // 사용자 정보 저장
      const userInfo = {
        birthDate,
        birthHour,
        gender: gender as "male" | "female",
      }
      setUserInfo(userInfo)

      // API 호출
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })

      if (!response.ok) {
        throw new Error("운세 분석에 실패했습니다.")
      }

      const data = await response.json()
      setFortuneResult(data)
      setCurrentPage("result")
      toast.success("운세 분석이 완료되었습니다!")
    } catch (error) {
      console.error("Error:", error)
      toast.error("운세 분석 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl text-foreground">AI가 분석하는 당신의 운명</CardTitle>
          <CardDescription className="text-muted-foreground">
            정확한 분석을 위해 생년월일시를 입력해주세요
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                생년월일 (8자리)
              </Label>
              <Input
                id="birthDate"
                placeholder="19900101"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value.replace(/\D/g, "").slice(0, 8))}
                maxLength={8}
                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Birth Hour */}
            <div className="space-y-2">
              <Label htmlFor="birthHour" className="text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                태어난 시간
              </Label>
              <Select value={birthHour} onValueChange={setBirthHour} disabled={isLoading}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="시간을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                      {hour.toString().padStart(2, "0")}시
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                성별
              </Label>
              <RadioGroup value={gender} onValueChange={setGender} disabled={isLoading}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                      남성
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                      여성
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  천기를 읽는 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  분석 시작하기
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

