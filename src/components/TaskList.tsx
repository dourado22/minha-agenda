// src/components/TaskList.tsx - COPIE TODO ESTE CÓDIGO
import React from 'react'
import { Task } from '@/types/task'
import { CheckCircle, Circle, Trash2, Edit, Save, X } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDeleteTask: (id: string) => void
  onUpdateTask: (id: string, updatedTask: Partial<Task>) => void
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask,
  onUpdateTask 
}) => {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editTitle, setEditTitle] = React.useState('')
  const [editDescription, setEditDescription] = React.useState('')
  const [editDate, setEditDate] = React.useState('')
  const [editPriority, setEditPriority] = React.useState<Task['priority']>('medium')
  const [editCategory, setEditCategory] = React.useState('')

  const handleEditClick = (task: Task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditDate(task.date)
    setEditPriority(task.priority)
    setEditCategory(task.category)
  }

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      onUpdateTask(id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        date: editDate,
        priority: editPriority,
        category: editCategory.trim() || 'Sem categoria',
        updatedAt: new Date().toISOString()
      })
      setEditingId(null)
    } else {
      alert('O título não pode estar vazio')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const categories = ['Trabalho', 'Estudo', 'Pessoal', 'Saúde', 'Lazer', 'Outros']

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2 className="form-title">Minhas Tarefas</h2>
        <div className="text-center py-12 text-gray-500">
          <p>Nenhuma tarefa cadastrada ainda.</p>
          <p className="text-sm mt-1">Adicione sua primeira tarefa acima!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      <h2 className="form-title">Minhas Tarefas ({tasks.length})</h2>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'opacity-75' : ''}`}
            style={{
              borderLeftColor: 
                task.priority === 'high' ? '#ef4444' : 
                task.priority === 'medium' ? '#f59e0b' : 
                '#10b981'
            }}
          >
            {editingId === task.id ? (
              // MODO EDIÇÃO
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-600">Editando Tarefa</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Save size={16} />
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o título"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                      placeholder="Adicione detalhes..."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data
                      </label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prioridade
                      </label>
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`w-full px-3 py-2 rounded-lg ${
                          task.completed 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        } transition`}
                      >
                        {task.completed ? 'Concluída' : 'Marcar como Concluída'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // MODO VISUALIZAÇÃO
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className="mt-1 text-gray-400 hover:text-green-600 transition"
                      title={task.completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
                    >
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mt-2">{task.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Editar tarefa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Excluir tarefa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {task.category}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority === 'high' ? 'Alta' : 
                     task.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                  </span>
                  <span className="text-gray-500 text-sm">
                    {task.date}
                  </span>
                  {task.updatedAt && (
                    <span className="text-gray-400 text-xs">
                      (editada)
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList