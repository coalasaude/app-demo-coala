import { BrowseTaskConstructor } from './browse-task.model'

export type BrowseCategoryTaskConstructor = {
  category: string
  tasks: BrowseTaskConstructor[]
}

export class BrowseCategoryTask {
  category: string
  tasks: BrowseTaskConstructor[]

  constructor(props: BrowseCategoryTaskConstructor) {
    this.category = props.category
    this.tasks = props.tasks
  }
}
