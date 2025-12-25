import React from 'react'
import { CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react'
import { Task } from '@/types/task'
import { format, isToday } from 'date-fns'

interface StatsCardProps {
  tasks: Task[]
}

export default function StatsCard({ tasks }: StatsCardProps) {
  const today = new Date()
  
  const todayTasks = tasks.filter(task => 
    format(task.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  )
  
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.filter(task => !task.completed).length
  const todayCompleted = todayTasks.filter(task => task.completed).length
  const todayPending = todayTasks.filter(task => !task.completed).length

  const stats = [
    {
      title: 'Total de Tarefas',
      value: tasks.length.toString(),
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Concluídas',
      value: completedTasks.toString(),
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      subtitle: `${tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%`
    },
    {
      title: 'Pendentes',
      value: pendingTasks.toString(),
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Hoje',
      value: `${todayCompleted}/${todayTasks.length}`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500',
      subtitle: todayTasks.length > 0 ? `${Math.round((todayCompleted / todayTasks.length) * 100)}%` : '0%'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-lg ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </div>
          {stat.subtitle && (
            <div className="text-xs font-medium text-gray-700">
              {stat.subtitle} completado
            </div>
          )}
        </div>
      ))}
    </div>
  )
}