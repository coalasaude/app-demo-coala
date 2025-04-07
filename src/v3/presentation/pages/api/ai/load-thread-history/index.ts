import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

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

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const { assistantId, userId } = req.query

      if (!assistantId || !userId) {
        res.status(400).json({ error: "assistantId e userId são obrigatórios" })
        return
      }

      const historyRef = collection(db, "history")
      const q = query(
        historyRef,
        where("assistantId", "==", assistantId),
        where("userId", "==", Number(userId))
      )

      const querySnapshot = await getDocs(q)
      const historyData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a: any, b: any) => {
          // Ordenar pelo campo de timestamp decrescente
          const aTime = a.timestamp.seconds * 1_000 + a.timestamp.nanoseconds / 1_000_000
          const bTime = b.timestamp.seconds * 1_000 + b.timestamp.nanoseconds / 1_000_000
          return bTime - aTime
        })

      res.status(200).json({ data: historyData })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Erro ao acessar a coleção do Firestore:", error)
      res.status(500).json({ error: "Erro ao acessar os dados do Firestore" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Método ${req.method} não permitido`)
  }
}
