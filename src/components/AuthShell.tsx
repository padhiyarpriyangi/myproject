import type { ReactNode } from 'react'
import { CheckCircle2, KanbanSquare, GripVertical, ShieldCheck } from 'lucide-react'

const points = [
  { icon: KanbanSquare, text: 'Kanban board with To Do, In Progress and Done' },
  { icon: GripVertical, text: 'Drag & drop tasks between columns' },
  { icon: ShieldCheck, text: 'Your own private, user-specific dashboard' },
]

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5" />
        <div className="relative flex items-center gap-2 text-lg font-semibold">
          <CheckCircle2 className="h-6 w-6" /> UniSphere Tasks
        </div>
        <div className="relative space-y-8">
          <h2 className="text-4xl font-bold leading-tight">Plan it. Move it.<br />Finish it.</h2>
          <ul className="space-y-4">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-indigo-100">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15"><Icon className="h-5 w-5" /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-indigo-200">UniSphere · Events</p>
      </aside>
      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
