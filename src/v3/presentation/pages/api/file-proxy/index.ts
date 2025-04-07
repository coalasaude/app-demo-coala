import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import mime from 'mime'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'Missing URL query parameter' })
  }

  try {
    const fetchUrl = Array.isArray(url) ? url.join('') : url
    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`Falhou ao buscar documento: ${response.status} ${response.statusText}`)
    }

    const extension = fetchUrl.split('.').pop()?.split(/\#|\?/)[0]
    const filename = fetchUrl.split('/').pop()?.split('.').slice(0, -1).join('')

    if (!extension) {
      throw new Error(`Falhou ao identificar extenção do documento`)
    }

    const contentType = mime.getType(extension)
    const data = await response.buffer()

    if (contentType && extension == 'pdf') {
      res.setHeader('Content-Type', contentType)
      res.setHeader('Content-Disposition', `inline; filename=${filename}.${extension}`)
    } else {
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.${extension}`)
      res.setHeader('Content-Type', 'application/octet-stream')
    }

    res.send(data)
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'Documento inválido ou sem autorização de acesso.', message: error.message })
  }
}
