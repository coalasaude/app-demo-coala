import { Profile } from '../Profile'

import { TApiUserResponse } from './ApiUserResponse'

export type DefaultStatus = 'ACTIVE' | 'INACTIVE'

export interface TImage {
  id: number
  url: string
  bucket_name: string
  filename: string
  user_id?: number
  user?: TApiUserResponse
  course?: TCourseResponse
  course_id?: number
  created_at: Date
  updated_at: Date
}

export interface TModule {
  id: number
  name: string
  description: string
  course_id: number
  course: TCourseResponse
  class: TClass[]
  created_at: Date
  status: DefaultStatus
  hasQuiz: boolean
  updated_at: Date
  progress?: number
}

export interface TClass {
  id: number
  name: string
  description: string
  video: string
  duration: number
  material: string
  module: TModule
  moduleId: number
  question: TQuestion[]
  status: DefaultStatus
  created_at: Date
  updated_at: Date
  alreadyViewed: boolean
}

export interface TAnswer {
  id: number
  text: string
  choice_id: number
  choice: TChoice
  created_at: Date
  updated_at: Date
}

export interface TChoice {
  id: number
  text: string
  question_id: number
  question: TQuestion
  answer: TAnswer[]
  created_at: Date
  updated_at: Date
}

export interface TQuestion {
  id: number
  command: string
  text: string
  class?: TClass
  class_id?: number
  course_id?: number
  course?: TCourseResponse
  choice: TChoice[]
  status: DefaultStatus
  created_at: Date
  updated_at: Date
  multipleChoice: boolean
}

export interface TCourseTest {
  id: number
  course: TCourseResponse
  course_id: number
  user: TApiUserResponse
  user_id: number
  grade: number
  created_at: Date
  updated_at?: Date
}

export interface TCourseDescription {
  id: number
  title: string
  description: string
  course_id: number
  course: TCourseResponse
  created_at: Date
  updated_at?: Date
}

export interface TCourseResponse {
  id: number
  title: string
  isPublished: boolean
  profiles?: Profile[]
  approval?: number
  chance?: number
  maximum_time?: number
  user_id: number
  userId: number
  image?: TImage
  image_id?: number
  user: TApiUserResponse
  status: DefaultStatus
  module: TModule[]
  test: TCourseTest[]
  descriptions: TCourseDescription[]
  question: TQuestion[]
  created_at: Date
  updated_at?: Date
  qtdQuestions?: number
  isEnrolled?: boolean
  progress?: number
  imageUrl: string
  isApproved?: boolean
  timesUserHasDoneTheTest?: number
  certificateValidity: number
  benefits?: string
}

export interface TApiCourseRegister {
  courseId: number
}
