export interface Task {
  id: string
  title: string
  description: string
  date: Date
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
}

export type ViewMode = 'day' | 'week' | 'month'