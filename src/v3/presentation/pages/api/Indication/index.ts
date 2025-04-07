/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'

import { coalaApi } from '@/v3/infra/request/implementations/CoalaApi'
import { RequestService } from '@/v3/infra/request'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default async function indication(req: NextApiRequest, res: NextApiResponse) {
  const api = coalaApi({
    headers: req.headers,
  })

  try {
    const response = await apiHandler(req, res, api)
    return res.status(200).send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
}

function apiHandler(req: NextApiRequest, res: NextApiResponse, requestService: RequestService) {
  const { method } = req
  const methodMap = {
    GET: getIndications,
    POST: addIndication,
  }

  if (method) {
    return methodMap[method as keyof typeof methodMap](requestService, req.body)
  }
}

async function getIndications(requestService: RequestService) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { headers, ...apiResponse } = await requestService.get<any>(url, {
      params: { limit: '1000' },
    })
    return apiResponse
  } catch (error) {
    throw new Error(error as any)
  }
}

async function addIndication(requestService: RequestService, params?: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { headers, ...apiResponse } = await requestService.post('gaming/indication', {
      fantasy_name: params?.fantasyName,
      manager_name: params?.managerName,
      manager_email: params?.managerEmail,
      manager_phone: params?.managerPhone,
      state: params?.state,
      city: params?.city,
      number_students: params?.numberStudents,
      monthly_payment: params?.monthlyPayment,
    })
    return apiResponse
  } catch (error) {
    throw new Error(`${error}`)
  }
}
