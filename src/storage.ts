import { Task } from '@/types/task'

const STORAGE_KEY = 'minha_agenda_tasks'

export const storage = {
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    
    const tasks = JSON.parse(data)
    return tasks.map((task: any) => ({
      ...task,
      date: new Date(task.date)
    }))
  },

  saveTasks: (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  addTask: (task: Task) => {
    const tasks = storage.getTasks()
    tasks.push(task)
    storage.saveTasks(tasks)
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    const tasks = storage.getTasks()
    const index = tasks.findIndex(task => task.id === id)
    
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates }
      storage.saveTasks(tasks)
    }
  },

  deleteTask: (id: string) => {
    const tasks = storage.getTasks()
    const filtered = tasks.filter(task => task.id !== id)
    storage.saveTasks(filtered)
  }
}