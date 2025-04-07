import { AssistantCategories } from "../constants/assistantsList"

export type Assistant = {
  icon: any,
  name: string,
  description: string,
  id: string
  category: AssistantCategories
}