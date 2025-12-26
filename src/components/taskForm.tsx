// src/components/TaskForm.tsx (atualize as classes)
import React, { useState } from 'react'
import { Plus, Calendar, Tag, Flag } from 'lucide-react'
import { Task } from '@/types/task'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Por favor, adicione um título para a tarefa')
      return
    }

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      date,
      priority,
      category: category.trim() || 'Sem categoria',
      completed: false,
      createdAt: new Date().toISOString()
    }

    onAddTask(newTask)
    
    // Reset form
    setTitle('')
    setDescription('')
    setDate(format(new Date(), 'yyyy-MM-dd'))
    setPriority('medium')
    setCategory('')
  }

  const categories = ['Trabalho', 'Estudo', 'Pessoal', 'Saúde', 'Lazer', 'Outros']

  return (
    <div className="task-form">
      <h2 className="form-title">
        <Plus size={24} />
        Nova Tarefa
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da tarefa"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione detalhes sobre a tarefa..."
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <Calendar size={16} /> Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">
              <Flag size={16} /> Prioridade
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <Tag size={16} /> Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn">
          <Plus size={20} />
          Adicionar Tarefa
        </button>
      </form>
    </div>
  )
}

export default TaskForm