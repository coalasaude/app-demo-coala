import { DialogInfoEnum } from '@/v3/domain/@v2/dashboard/enum/dialog-info.enum'

import apiRequest from '../../api'

import { DashBoardRoutes } from './dashboard.routes'

export type GetDialogInfoResponse = DialogInfoEnum | null

export type GetDialogInfoParams = {
  institutionId: number
}

export async function getDialogInfo(params: GetDialogInfoParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: DashBoardRoutes.GET_DIALOG_INFO,
    queryParams: params,
  })) as GetDialogInfoResponse

  return data || DialogInfoEnum.DEFAULT
}
