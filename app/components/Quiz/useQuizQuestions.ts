import { useMemo } from "react"

import type { QuizMeta, QuizQuestion } from "./quiz.types"

export function useQuizQuestions(): { meta: QuizMeta; questions: QuizQuestion[] } {
  return useMemo(
    () => ({
      meta: {
        title: "30-Second Wealth Quiz",
        subtitle: "Test your money knowledge and earn XP.",
        estimatedTime: "~30 seconds",
        completionXp: 100,
      },
      questions: [
        {
          id: "emergency-fund",
          question: "What is an emergency fund mainly used for?",
          options: [
            "Unexpected expenses like medical bills or job loss",
            "Buying stocks during a market dip",
            "Paying off your mortgage early",
            "Funding a vacation",
          ],
          correctIndex: 0,
          explanation:
            "An emergency fund covers unplanned costs so you don't have to rely on debt.",
          correctXp: 20,
          incorrectXp: 10,
        },
        {
          id: "sip",
          question: "What does SIP generally mean?",
          options: [
            "Systematic Investment Plan",
            "Savings Interest Plan",
            "Stock Investment Process",
            "Secure Investment Plan",
          ],
          correctIndex: 0,
          explanation: "A SIP allows you to invest a fixed amount regularly.",
          correctXp: 20,
          incorrectXp: 10,
        },
        {
          id: "compound-interest",
          question: "Compound interest grows fastest when you...",
          options: [
            "Wait until you have a large lump sum",
            "Start investing early and stay consistent",
            "Withdraw and reinvest every month",
            "Only invest during market highs",
          ],
          correctIndex: 1,
          explanation: "Time in the market lets compounding work in your favor.",
          correctXp: 20,
          incorrectXp: 10,
        },
        {
          id: "credit-score",
          question: "A high credit score generally helps you...",
          options: [
            "Avoid paying taxes",
            "Guarantee stock market returns",
            "Get loans at lower interest rates",
            "Skip KYC verification",
          ],
          correctIndex: 2,
          explanation: "Lenders offer better rates to borrowers with strong credit history.",
          correctXp: 20,
          incorrectXp: 10,
        },
        {
          id: "diversification",
          question: "Diversification mainly helps reduce...",
          options: [
            "The time it takes to get rich",
            "Risk from any single investment",
            "Brokerage fees",
            "Inflation completely",
          ],
          correctIndex: 1,
          explanation: "Spreading investments across assets reduces the impact of any one loss.",
          correctXp: 20,
          incorrectXp: 10,
        },
      ],
    }),
    [],
  )
}
