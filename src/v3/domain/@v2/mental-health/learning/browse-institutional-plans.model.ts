export type BrowseInstitutionalPlanConstructor = {
  id: number
  responsibleCollaborator: string
  patient: {
    id: number
    name: string
  }
  taskProgressPercent?: number
  imageUrl: string
}

export class BrowseInstitutionalPlan {
  id: number
  responsibleCollaborator: string
  patient: {
    id: number
    name: string
  }
  taskProgressPercent?: number
  imageUrl: string

  constructor(props: BrowseInstitutionalPlanConstructor) {
    this.id = props.id
    this.responsibleCollaborator = props.responsibleCollaborator
    this.patient = {
      id: props.patient.id,
      name: props.patient.name,
    }
    this.taskProgressPercent = props.taskProgressPercent
    this.imageUrl = props.imageUrl
  }
}
