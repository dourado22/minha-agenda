export interface Task {
  id: string
  title: string
  description: string
  date: string
  priority: 'low' | 'medium' | 'high'
  category: string
  completed: boolean
  createdAt: string
}