import { MentalHealthCategory } from './category.model'

type TaskConstructor = {
  category?: MentalHealthCategory
  objective?: string | null
  activities?: string | null
  adaptations?: string | null
  supportTechnologies?: string | null
  assessment?: string | null
  planId?: number
}

export class MentalHealthTask {
  category?: MentalHealthCategory
  objective?: string | null
  activities?: string | null
  adaptations?: string | null
  supportTechnologies?: string | null
  assessment?: string | null
  planId?: number

  constructor(params: TaskConstructor) {
    this.category = params.category
    this.objective = params.objective
    this.activities = params.activities
    this.adaptations = params.adaptations
    this.supportTechnologies = params.supportTechnologies
    this.assessment = params.assessment
    this.planId = params.planId
  }
}
