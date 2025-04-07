import { NextApiRequest, NextApiResponse } from 'next'

export default function healthCheck(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send('ok')
}
