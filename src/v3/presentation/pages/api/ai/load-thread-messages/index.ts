/* eslint-disable no-console */
import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const { threadId } = req.query
      const threadMessages = await client.beta.threads.messages.list(threadId)

      res.status(200).json({ data: threadMessages.data.reverse() })
    } catch (error) {
      console.error("Erro ao acessar a API da OpenAI:", error)
      res.status(500).json({ error: "Erro ao comunicar com Coala AII" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Método ${req.method} não permitido`)
  }
}
