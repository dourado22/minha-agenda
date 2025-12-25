import React from 'react'
import { Check, Trash2, Edit2, Flag, Calendar, Tag } from 'lucide-react'
import { Task } from '@/types/task'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDeleteTask: (id: string) => void
  selectedDate?: Date
}

export default function TaskList({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask,
  selectedDate = new Date()
}: TaskListProps) {
  
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
    }
  }

  const filteredTasks = tasks.filter(task => 
    format(task.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhuma tarefa para hoje
        </h3>
        <p className="text-gray-500">
          Adicione tarefas para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Tarefas de {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
        </span>
      </div>

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${
            task.completed 
              ? 'border-green-500 opacity-80' 
              : task.priority === 'high' 
                ? 'border-red-500' 
                : task.priority === 'medium'
                  ? 'border-yellow-500'
                  : 'border-green-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4" />}
                </button>
                
                <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
              </div>

              {task.description && (
                <p className="text-gray-600 ml-9 mb-3">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-2 ml-9">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                  <Flag className="w-3 h-3" />
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
                
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-300">
                  <Tag className="w-3 h-3" />
                  {task.category}
                </span>
                
                <span className="text-sm text-gray-500">
                  {format(task.date, 'HH:mm')}
                </span>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir tarefa"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}