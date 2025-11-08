"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User } from "lucide-react"

export function SajuInputForm() {
  const [formData, setFormData] = useState({
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    birthHour: "",
    gender: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl text-foreground">사주 정보 입력</CardTitle>
          <CardDescription className="text-muted-foreground">
            정확한 분석을 위해 생년월일시를 입력해주세요
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                이름
              </Label>
              <Input
                id="name"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                생년월일
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  placeholder="1990"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  placeholder="01"
                  value={formData.birthMonth}
                  onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  placeholder="01"
                  value={formData.birthDay}
                  onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Birth Hour */}
            <div className="space-y-2">
              <Label htmlFor="birthHour" className="text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                태어난 시간
              </Label>
              <Select
                value={formData.birthHour}
                onValueChange={(value) => setFormData({ ...formData, birthHour: value })}
              >
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="시간을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="23-01">자시 (23:00 - 01:00)</SelectItem>
                  <SelectItem value="01-03">축시 (01:00 - 03:00)</SelectItem>
                  <SelectItem value="03-05">인시 (03:00 - 05:00)</SelectItem>
                  <SelectItem value="05-07">묘시 (05:00 - 07:00)</SelectItem>
                  <SelectItem value="07-09">진시 (07:00 - 09:00)</SelectItem>
                  <SelectItem value="09-11">사시 (09:00 - 11:00)</SelectItem>
                  <SelectItem value="11-13">오시 (11:00 - 13:00)</SelectItem>
                  <SelectItem value="13-15">미시 (13:00 - 15:00)</SelectItem>
                  <SelectItem value="15-17">신시 (15:00 - 17:00)</SelectItem>
                  <SelectItem value="17-19">유시 (17:00 - 19:00)</SelectItem>
                  <SelectItem value="19-21">술시 (19:00 - 21:00)</SelectItem>
                  <SelectItem value="21-23">해시 (21:00 - 23:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-foreground">성별</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="성별을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg"
            >
              사주 분석 시작하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
