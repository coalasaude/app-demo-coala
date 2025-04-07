import { UserComment, UserCommentConstructor } from './user-comment.model'

export type BrowseCommentsConstructor = {
  id: number
  user: UserCommentConstructor
  content: string
  reply?: BrowseComments
  createdAt: Date
  repliesCount?: number
  likeCount?: number
  userAlreadyLiked?: boolean
}

export class BrowseComments {
  id: number
  user: UserComment
  content: string
  reply?: BrowseComments
  createdAt: Date
  repliesCount: number
  likeCount: number
  userAlreadyLiked?: boolean

  constructor(props: BrowseCommentsConstructor) {
    this.id = props.id
    this.user = new UserComment(props.user)
    this.content = props.content
    this.createdAt = props.createdAt
    this.repliesCount = props.repliesCount || 0
    this.likeCount = props.likeCount || 0
    this.userAlreadyLiked = props.userAlreadyLiked
  }
}
