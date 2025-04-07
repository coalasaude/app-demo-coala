import { ReactNode } from 'react'

export interface HorizontalScrollListProps<T> {
    options: T[]
    renderItem: (item: T, index: number) => ReactNode  
}
