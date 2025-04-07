import { Module } from './Module'
import { Profile } from './Profile'
import { Question } from './Question'
import { User } from './User'
import {
  DefaultStatus,
  TCourseResponse,
  TCourseTest,
  TCourseDescription,
  TImage,
} from './api/ApiCourseResponse'

export class Description {
  id: number
  title: string
  description: string
  courseId: number
  course?: Course

  constructor(props: TCourseDescription) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.courseId = props.course_id
    this.course = props.course ? new Course(props.course) : undefined
  }
}

export class Course {
  id: number
  title: string
  isPublished: boolean
  profiles?: Profile[]
  approval?: number
  chance?: number
  maximumTime?: number
  qtdQuestions?: number
  image?: TImage
  image_id?: number
  module: Module[]
  test: TCourseTest[]
  question: Question[]
  descriptions: Description[]
  status: DefaultStatus
  userId: number
  user?: User
  createdAt: Date
  updatedAt?: Date
  isEnrolled?: boolean
  progress?: number
  imageUrl: string
  isApproved?: boolean
  timesUserHasDoneTheTest?: number
  certificateValidity?: string
  benefits?: string

  constructor(props: TCourseResponse) {
    this.id = props.id
    this.title = props.title
    this.isPublished = props.isPublished
    this.profiles = props.profiles
    this.approval = props.approval
    this.chance = props.chance
    this.maximumTime = props.maximum_time
    this.qtdQuestions = props.qtdQuestions
    this.descriptions = props.descriptions
      ? props.descriptions.map((description) => new Description(description))
      : []
    this.module = props.module ? props.module.map((module) => new Module(module)) : []
    this.test = props.test
    this.question = props.question ? props.question.map((question) => new Question(question)) : []
    this.status = props.status
    this.userId = props.user_id
    this.user = props.user ? new User(props.user) : undefined
    this.image = props.image
    this.image_id = props.image_id
    this.createdAt = props.created_at
    this.updatedAt = props.updated_at
    this.isEnrolled = props.isEnrolled
    this.progress = props.progress
    this.imageUrl = props.imageUrl
    this.isApproved = props.isApproved
    this.certificateValidity = String(props.certificateValidity)
    this.timesUserHasDoneTheTest = props.timesUserHasDoneTheTest
    this.benefits = props.benefits
  }
}
