import { Link } from '@tanstack/react-router'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task } from '@/store/tasks'
import { Button } from '@/components/ui/button'

export function TaskCard({ task, onDelete }: { task: Task; onDelete: () => void }) {
  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
      className="cursor-grab space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
        <div className="min-w-0 flex-1">
          <h3 className={cn('break-words font-semibold leading-snug', task.status === 'completed' && 'text-slate-400 line-through')}>{task.title}</h3>
          <p className="mt-1 line-clamp-3 break-words text-sm text-slate-500">{task.description}</p>
        </div>
      </div>
      <div className="flex gap-2 pl-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/tasks/$taskId/edit" params={{ taskId: task.id }}><Pencil className="h-3.5 w-3.5" /> Edit</Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
      </div>
    </article>
  )
}
