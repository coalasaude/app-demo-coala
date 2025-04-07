import { Class } from './Class'
import { Course } from './Course'
import { DefaultStatus, TChoice, TQuestion } from './api/ApiCourseResponse'

export class Question {
  id: number
  command: string
  text: string
  class?: Class
  classId?: number
  courseId?: number
  course?: Course
  choice: TChoice[]
  status: DefaultStatus
  createdAt: Date
  updatedAt: Date
  multipleChoice: boolean

  constructor(params: TQuestion) {
    this.id = params.id
    this.command = params.command
    this.text = params.text
    this.class = params.class ? new Class(params.class) : undefined
    this.classId = params.class_id
    this.courseId = params.course_id
    this.course = params.course ? new Course(params.course) : undefined
    this.choice = params.choice
    this.status = params.status
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.multipleChoice = params.multipleChoice
  }
}
