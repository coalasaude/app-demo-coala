import { Class } from './Class'
import { Course } from './Course'
import { DefaultStatus, TModule } from './api/ApiCourseResponse'

export class Module {
  id: number
  name: string
  description: string
  courseId: number
  course?: Course
  class: Class[]
  createdAt: Date
  status: DefaultStatus
  updatedAt: Date
  hasQuiz?: boolean
  progress?: number

  constructor(params: TModule) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.courseId = params.course_id
    this.course = params.course ? new Course(params.course) : undefined
    this.class = params.class ? params.class.map((classItem) => new Class(classItem)) : []
    this.createdAt = params.created_at
    this.hasQuiz = params.hasQuiz
    this.status = params.status
    this.updatedAt = params.updated_at
    this.progress = params.progress
  }

  getProgressPercentage() {
    return this.progress ? Math.round(this.progress * 100) : 0
  }
}
