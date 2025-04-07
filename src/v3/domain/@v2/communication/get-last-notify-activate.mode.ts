export interface NotifyAccountActivationModelConstructor {
  date: string
  hasSendNotification: boolean
  lastSendByUser: string
  group: NotifyGroupEnum
}
export enum NotifyGroupEnum {
  ALL = 'ALL',
  RESPONSIBLE = 'RESPONSIBLE',
  HEALTH_LEADER = 'HEALTH_LEADER',
  COLLABORATOR = 'COLLABORATOR',
  MANAGER = 'MANAGER',
}

export const notifyGroupMap = {
  [NotifyGroupEnum.ALL]: 'Todos',
  [NotifyGroupEnum.RESPONSIBLE]: 'Responsável',
  [NotifyGroupEnum.HEALTH_LEADER]: 'Líder de saúde',
  [NotifyGroupEnum.COLLABORATOR]: 'Colaborador',
  [NotifyGroupEnum.MANAGER]: 'Gestor',
}

export class NotifyAccountActivationModel {
  public date: string
  public hasSendNotification: boolean
  public lastSendByUser: string
  public group: NotifyGroupEnum

  constructor(data: NotifyAccountActivationModelConstructor) {
    this.date = data.date
    this.hasSendNotification = data.hasSendNotification
    this.lastSendByUser = data.lastSendByUser
    this.group = data.group
  }
}
