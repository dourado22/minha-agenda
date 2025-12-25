import React, { useState, useEffect } from 'react'
import { Calendar, ListTodo, BarChart3, Settings } from 'lucide-react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import StatsCard from '@/components/StatsCard'
import CalendarView from '@/components/CalendarView'
import { Task, ViewMode } from '@/types/task'
import { storage } from '@/utils/storage'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('day')
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar' | 'stats'>('tasks')

  useEffect(() => {
    setTasks(storage.getTasks())
  }, [])

  const handleTaskAdded = (task: Task) => {
    storage.addTask(task)
    setTasks(prev => [...prev, task])
  }

  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      const updated = { ...task, completed: !task.completed }
      storage.updateTask(id, updated)
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
    }
  }

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      storage.deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Minha Agenda Diária</h1>
                <p className="text-blue-100">Organize suas tarefas de forma simples e eficiente</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                Exportar
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Sincronizar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            Tarefas
          </button>
          
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'calendar'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Calendário
          </button>
          
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Estatísticas
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {format(selectedDate, "dd 'de' MMMM, yyyy")}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
                  >
                    Hoje
                  </button>
                </div>
              </div>
              
              {activeTab === 'tasks' && (
                <TaskList
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                  selectedDate={selectedDate}
                />
              )}
              
              {activeTab === 'calendar' && (
                <CalendarView
                  tasks={tasks}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              )}
              
              {activeTab === 'stats' && <StatsCard tasks={tasks} />}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TaskForm onTaskAdded={handleTaskAdded} />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-bold text-gray-800 mb-3">Resumo Rápido</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tarefas hoje:</span>
                  <span className="font-semibold">
                    {tasks.filter(t => format(t.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prioritárias:</span>
                  <span className="font-semibold text-red-600">
                    {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxa conclusão:</span>
                  <span className="font-semibold text-green-600">
                    {tasks.length > 0 
                      ? `${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%`
                      : '0%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-bold text-gray-800 mb-3">Categorias</h3>
              <div className="space-y-2">
                {['Trabalho', 'Estudo', 'Pessoal', 'Saúde', 'Outro'].map(category => {
                  const count = tasks.filter(t => t.category === category).length
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-600">{category}</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-gray-500 text-sm">
        <p>Minha Agenda Diária • {new Date().getFullYear()} • Dados salvos localmente</p>
        <p className="mt-1">
          <button 
            onClick={() => {
              if (window.confirm('Isso apagará TODAS as tarefas. Continuar?')) {
                localStorage.clear()
                setTasks([])
              }
            }}
            className="text-red-500 hover:text-red-700"
          >
            Limpar todos os dados
          </button>
        </p>
      </footer>
    </div>
  )
}