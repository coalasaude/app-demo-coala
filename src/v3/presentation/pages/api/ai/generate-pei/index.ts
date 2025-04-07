import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function parseToJson(input: string): object | null {
  try {
    const cleanedInput = input
      .replace(/\n/g, '')
      .replace(/…/g, '')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')

    const json = JSON.parse(cleanedInput)
    return json
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao converter string em JSON:', error)
    return null
  }
}

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const {
        frequency,
        days,
        ageYears,
        ageMonths,
        duration,
        specialCondition,
        difficulties,
        objective,
        allergyHistory,
        diseaseHistory,
        medicationHistory,
        sickNoteHistory,
        vaccinesHistory,
      } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

      if (!difficulties || !objective) {
        return res
          .status(400)
          .json({ error: "Os campos 'difficulties' e 'objective' são obrigatórios." })
      }

      const fields = {
        frequency: frequency ? `<Frequencia>${frequency}</Frequencia>` : null,
        days: days ? `<DIAS_DA_SEMANA>${days}</DIAS_DA_SEMANA>` : null,
        ageYears: ageYears ? `<IDADE_ALUNO_ANOS>${ageYears} anos</IDADE_ALUNO_ANOS>` : null,
        ageMonths: ageMonths ? `<IDADE_ALUNO_MESES>${ageMonths} meses</IDADE_ALUNO_MESES>` : null,
        duration: duration ? `<DURACAO_PLANO>${duration}</DURACAO_PLANO>` : null,
        specialCondition: specialCondition
          ? `<CONDICAO_ESPECIAL>${specialCondition}</CONDICAO_ESPECIAL>`
          : null,
        difficulties: `<DIFICULDADES>${difficulties}</DIFICULDADES>`,
        objective: `<OBJETIVO_PLANO>${objective}</OBJETIVO_PLANO>`,
        allergyHistory: allergyHistory
          ? `<HISTORICO_DE_ALERGIAS>${allergyHistory}</HISTORICO_DE_ALERGIAS>`
          : null,
        diseaseHistory: diseaseHistory
          ? `<HISTORICO_DE_DOENCAS>${diseaseHistory}</HISTORICO_DE_DOENCAS>`
          : null,
        medicationHistory: medicationHistory
          ? `<HISTORICO_DE_MEDICAMENTOS>${medicationHistory}</HISTORICO_DE_MEDICAMENTOS>`
          : null,
        sickNoteHistory: sickNoteHistory
          ? `<HISTORICO_DE_ATESTADOS>${sickNoteHistory}</HISTORICO_DE_ATESTADOS>`
          : null,
        vaccinesHistory: vaccinesHistory
          ? `<HISTORICO_DE_VACINAS>${vaccinesHistory}</HISTORICO_DE_VACINAS>`
          : null,
      }

      const messageContent = Object.values(fields)
        .filter((value) => value !== null)
        .join('\n')

      const threadResponse = await client.beta.threads.create()
      const threadId = threadResponse.id
      await client.beta.threads.messages.create(threadId, {
        role: 'user',
        content: messageContent,
      })

      const runResponse = await client.beta.threads.runs.create(threadId, {
        assistant_id: 'asst_EqXOR20RV3PKnLU7gBrBgmCp',
      })
      const runId = runResponse.id

      let status = 'in_progress'

      while (status === 'in_progress') {
        const runStatus = await client.beta.threads.runs.retrieve(threadId, runId)
        status = runStatus.status

        if (status === 'completed') {
          break
        } else if (status === 'failed') {
          throw new Error('A execução da thread falhou.')
        } else {
          status = 'in_progress'
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }
      const messages = await client.beta.threads.messages.list(threadId)
      const finalResult: string[] = []

      if (messages.data) {
        const lastMessage = messages.data[0]
        if (lastMessage.role === 'assistant') {
          for (const content of lastMessage.content || []) {
            if (content.type === 'text' && content.text) {
              finalResult.push(content.text.value)
            }
          }
        }
      }

      res.status(200).json({
        data: parseToJson(finalResult.join('\n')),
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao processar a requisição:', error)
      res.status(500).json({ error: 'Erro ao processar os dados da API' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Método ${req.method} não permitido`)
  }
}
