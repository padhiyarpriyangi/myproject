import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { taskSchema, type TaskValues } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { COLUMNS, type Task } from '@/store/tasks'

// Shared by the Create Task and Edit Task pages
export function TaskForm({ task, onSubmit, submitLabel }: { task?: Task; onSubmit: (v: TaskValues) => void; submitLabel: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: task?.title ?? '', description: task?.description ?? '', status: task?.status ?? 'todo' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="Title" error={errors.title?.message}><Input placeholder="e.g. Design the login page" {...register('title')} /></Field>
      <Field label="Description" error={errors.description?.message}><Textarea placeholder="What needs to be done?" {...register('description')} /></Field>
      <Field label="Status" error={errors.status?.message}>
        <Select {...register('status')}>{COLUMNS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</Select>
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <Button asChild variant="outline"><Link to="/dashboard">Cancel</Link></Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  )
}
