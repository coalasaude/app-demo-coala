import OpenAI from "openai"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_AI_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { question, threadId, assistantId, isFirstMessage, userId } =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body


      await client.beta.threads.messages.create(threadId, {
        role: "user",
        content: question,
      })
      if (isFirstMessage) {
        try {
          await addDoc(collection(db, "history"), {
            userId,
            threadId,
            question,
            assistantId,
            timestamp: new Date(),
          })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Erro ao salvar no Firebase:", error)
          res.status(500).json({ error: "Erro ao salvar os dados no Firebase" })
          return
        }
      }

      const stream = client.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId,
      })

      res.setHeader("Content-Type", "text/event-stream")
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("Connection", "keep-alive")
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Transfer-Encoding", "chunked")

      for await (const event of stream as any) {
        const content = event?.data?.delta?.content
        if (content?.length > 0) {
          const firstContent = content[0]
          res.write(firstContent?.text?.value)
          if (res.flush) {
            res.flush()
          } else {
            res.write('')
          }
        }
      }

      res.end()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Erro ao acessar a API da OpenAI:", error)

      res
        .status(500)
        .json({ error: "Erro ao comunicar com Coala AII" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Método ${req.method} não permitido`)
  }
}
