import { useMemo, useState } from 'react'
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { CheckCircle2, CircleCheckBig, Eye, LayoutList, Loader, LogOut, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCurrentUser, useAuth } from '@/store/auth'
import { COLUMNS, useTasks, type Status } from '@/store/tasks'
import { Button } from '@/components/ui/button'
import { TaskCard } from '@/components/TaskCard'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => { if (!getCurrentUser()) throw redirect({ to: '/login' }) }, // protected route
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const user = useAuth((s) => s.users.find((u) => u.id === s.currentUserId))
  const logout = useAuth((s) => s.logout)
  const { tasks: all, deleteTask, moveTask } = useTasks()
  const [over, setOver] = useState<Status | null>(null)

  const mine = useMemo(() => all.filter((t) => t.userId === user?.id), [all, user?.id]) // only this user's tasks
  const count = (s: Status) => mine.filter((t) => t.status === s).length

  const stats = [
    { label: 'Total Tasks', value: mine.length, Icon: LayoutList, tone: 'bg-indigo-50 text-indigo-600' },
    { label: 'In Progress', value: count('in_progress'), Icon: Loader, tone: 'bg-amber-50 text-amber-600' },
    { label: 'In Review', value: count('review'), Icon: Eye, tone: 'bg-violet-50 text-violet-600' },
    { label: 'Completed', value: count('completed'), Icon: CircleCheckBig, tone: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white"><CheckCircle2 className="h-5 w-5" /></span>
            <div className="leading-tight">
              <p className="font-semibold">To-Do Task Board</p>
              <p className="text-xs text-slate-500">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { logout(); navigate({ to: '/login' }) }}><LogOut className="h-4 w-4" /> Logout</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-slate-500">Manage your tasks and track your progress.</p>
          </div>
          <Button asChild><Link to="/tasks/new"><Plus className="h-4 w-4" /> Create Task</Link></Button>
        </div>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, Icon, tone }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', tone)}><Icon className="h-5 w-5" /></span>
              <div><p className="text-2xl font-bold leading-none">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>
            </div>
          ))}
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
            const items = mine.filter((t) => t.status === col.id)
            return (
              <div
                key={col.id}
                onDragOver={(e) => { e.preventDefault(); setOver(col.id) }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) moveTask(id, col.id); setOver(null) }}
                className={cn('flex min-h-72 flex-col rounded-2xl border-2 border-transparent bg-slate-100/70 p-3 transition', over === col.id && 'border-dashed border-indigo-400 bg-indigo-50/60')}
              >
                <h2 className="mb-3 flex items-center justify-between px-1 font-semibold">
                  <span className="flex items-center gap-2"><span className={cn('h-2.5 w-2.5 rounded-full', col.dot)} />{col.label}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500">{items.length}</span>
                </h2>
                <div className="flex flex-1 flex-col gap-3">
                  {items.map((t) => <TaskCard key={t.id} task={t} onDelete={() => { if (confirm(`Delete "${t.title}"?`)) deleteTask(t.id) }} />)}
                  {items.length === 0 && (
                    <div className="grid flex-1 place-items-center rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-400">Drop tasks here</div>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}
