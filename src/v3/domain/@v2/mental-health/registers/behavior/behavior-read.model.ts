import { BehaviorType } from '../../enums/behavior-type.enum'

export interface MentalHealthBehaviorReadModelConstructor {
  id: number
  type: BehaviorType
  name: string
  trigger?: string
  description?: string
}

export class MentalHealthBehaviorReadModel {
  public readonly id: number
  public readonly type: BehaviorType
  public readonly title: string
  public readonly trigger?: string
  public readonly description?: string

  constructor(props: MentalHealthBehaviorReadModelConstructor) {
    this.id = props.id
    this.type = props.type
    this.title = props.name
    this.trigger = props.trigger
    this.description = props.description
  }
}
