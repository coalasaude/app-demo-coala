import { ReactNode } from "react"

export interface StackListFormContainerProps<T> {
  onEdit?: (data: T, index: number) => void;
  onAdd: () => void;
  data: T[];
  getSubText: (data: T,  index: number) => ReactNode;
  getText: (data: T,  index: number) => ReactNode;
  onHideItem?: (data: T,  index: number) => boolean;
  icon: JSX.Element;
  emptyText?: string;
  title?: ReactNode;
  addButtonText?: ReactNode;
}
