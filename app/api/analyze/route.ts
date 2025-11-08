import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { birthDate, birthHour, gender } = await request.json()

    // 유효성 검사
    if (!birthDate || !birthHour || !gender) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 })
    }

    // Gemini API 키 확인
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 })
    }

    // Gemini API 초기화
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // 생년월일 포맷팅
    const year = birthDate.substring(0, 4)
    const month = birthDate.substring(4, 6)
    const day = birthDate.substring(6, 8)
    const genderText = gender === "male" ? "남성" : "여성"

    // 프롬프트 생성
    const prompt = `너는 전문 사주 명리학자야. 
생년월일: ${year}년 ${month}월 ${day}일
태어난 시간: ${birthHour}시
성별: ${genderText}

위 정보를 가진 사람의 다음 세 가지 운세를 각각 100자 내외로 요약해서 분석해줘:
1. 오늘의 운세
2. 재물운
3. 애정운

현대적이고 희망적인 어조로 설명해줘. 반드시 아래 JSON 형식으로만 응답해줘:

\`\`\`json
{
  "today": "오늘의 운세 내용...",
  "wealth": "재물운 내용...",
  "love": "애정운 내용..."
}
\`\`\`

JSON 형식 외의 다른 텍스트는 포함하지 마.`

    // API 호출
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // JSON 추출
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/{[\s\S]*}/)
    if (!jsonMatch) {
      throw new Error("응답에서 JSON을 추출할 수 없습니다.")
    }

    const jsonText = jsonMatch[1] || jsonMatch[0]
    const fortuneData = JSON.parse(jsonText)

    return NextResponse.json(fortuneData)
  } catch (error) {
    console.error("운세 분석 오류:", error)
    return NextResponse.json(
      { error: "운세 분석 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 },
    )
  }
}

