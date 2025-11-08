import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { birthDate, birthHour, gender, message, chatHistory } = await request.json()

    // 유효성 검사
    if (!birthDate || !birthHour || !gender || !message) {
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

    // 시스템 프롬프트
    const systemPrompt = `너는 사주 명리학 전문가야. 
다음은 상담하는 사용자의 정보야:
- 생년월일: ${year}년 ${month}월 ${day}일
- 태어난 시간: ${birthHour}시
- 성별: ${genderText}

이 사주 정보를 바탕으로 사용자의 모든 질문에 친절하고 명확하게 답변해줘. 
현대적이고 희망적인 어조를 유지하며, 사용자가 이해하기 쉽게 설명해줘.
답변은 200자 내외로 간결하게 작성해줘.`

    // 채팅 히스토리 포맷팅
    const history = chatHistory?.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })) || []

    // 채팅 세션 시작
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "네, 이해했습니다. 사주 정보를 바탕으로 친절하게 상담해드리겠습니다." }],
        },
        ...history,
      ],
    })

    // 메시지 전송
    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error("채팅 오류:", error)
    return NextResponse.json(
      { error: "채팅 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 },
    )
  }
}

