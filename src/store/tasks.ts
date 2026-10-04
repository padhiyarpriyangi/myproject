import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { uid } from '@/lib/utils'

export type Status = 'todo' | 'in_progress' | 'review' | 'completed'

export interface Task {
  id: string
  userId: string // user tracking: each task belongs to the logged-in user
  title: string
  description: string
  status: Status
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  addTask: (title: string, description: string, status: Status, userId: string) => void
  updateTask: (id: string, title: string, description: string, status: Status) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: Status) => void
}

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, description, status, userId) =>
        set((s) => ({ tasks: [...s.tasks, { id: uid(), userId, title, description, status, createdAt: new Date().toISOString() }] })),
      updateTask: (id, title, description, status) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, title, description, status } : t)) })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      moveTask: (id, status) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })),
    }),
    { name: 'unisphere-tasks-v2' },
  ),
)

export const COLUMNS: { id: Status; label: string; dot: string }[] = [
  { id: 'todo', label: 'To Do', dot: 'bg-slate-400' },
  { id: 'in_progress', label: 'In Progress', dot: 'bg-amber-500' },
  { id: 'review', label: 'Review', dot: 'bg-violet-500' },
  { id: 'completed', label: 'Completed', dot: 'bg-emerald-500' },
]
