import { Module } from './Module'
import { DefaultStatus, TClass, TQuestion } from './api/ApiCourseResponse'

export class Class {
  id: number
  name: string
  description: string
  video: string
  duration: number
  material: string
  module?: Module
  moduleId: number
  question: TQuestion[]
  status: DefaultStatus
  createdAt: Date
  updatedAt: Date
  alreadyViewed: boolean

  constructor(params: TClass) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.video = params.video
    this.duration = params.duration
    this.material = params.material
    this.module = params.module ? new Module(params.module) : undefined
    this.moduleId = params.moduleId
    this.question = params.question
    this.createdAt = params.created_at
    this.status = params.status
    this.updatedAt = params.updated_at
    this.alreadyViewed = params.alreadyViewed
  }

  findPrevAndNext(): { prev: number | null; next: number | null } {
    const classes = this.module?.class
    if (!classes) return { prev: null, next: null }
    classes.sort((a, b) => a.id + b.id)
    const currentIndex = classes.findIndex((cls) => cls.id === this.id)
    const prevIndex = currentIndex - 1
    const nextIndex = currentIndex + 1
    const prevId = prevIndex >= 0 ? classes[prevIndex].id : null
    const nextId = nextIndex < classes.length ? classes[nextIndex].id : null

    return { prev: prevId, next: nextId }
  }
}
