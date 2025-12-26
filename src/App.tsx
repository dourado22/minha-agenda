// src/App.tsx
import React, { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'  // ← IMPORTA O NOVO COMPONENTE
import { Task } from '@/types/task'
import { Plus, CheckCircle, Calendar, AlertCircle } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Carregar do localStorage se existir
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  // Salvar no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]) // Nova tarefa no início
  }

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { 
        ...task, 
        completed: !task.completed,
        updatedAt: new Date().toISOString()
      } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleUpdateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { 
        ...task, 
        ...updatedTask,
        updatedAt: new Date().toISOString()
      } : task
    ))
  }

  // Estatísticas
  const completedTasks = tasks.filter(t => t.completed).length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length
  const today = new Date().toISOString().split('T')[0]
  const todayTasks = tasks.filter(t => t.date === today).length

  return (
    <div>
      <header>
        <h1>Minha Agenda</h1>
        <p className="subtitle">Gerencie suas tarefas diárias</p>
      </header>
      
      <div className="container">
        <TaskForm onAddTask={handleAddTask} />
        
        {/* Estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-label">Total de Tarefas</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-number">{completedTasks}</div>
            <div className="stat-label">Concluídas</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-number">{todayTasks}</div>
            <div className="stat-label">Para Hoje</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-number">{highPriorityTasks}</div>
            <div className="stat-label">Alta Prioridade</div>
          </div>
        </div>

        {/* Componente TaskList com todas as funcionalidades */}
        <TaskList 
          tasks={tasks} 
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  )
}

export default App