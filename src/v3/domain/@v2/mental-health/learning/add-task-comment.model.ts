type AddTaskCommentConstructor = {
  taskId: number
  content: string
  userId: number
  parentId?: number
}

export class AddTaskComment {
  taskId: number
  content: string
  userId: number
  parentId?: number

  constructor(params: AddTaskCommentConstructor) {
    this.taskId = params.taskId
    this.content = params.content
    this.userId = params.userId
    this.parentId = params.parentId
  }
}
