import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { getCurrentUser } from '@/store/auth'
import { useTasks } from '@/store/tasks'
import { TaskForm } from '@/components/TaskForm'
import { TaskPageShell } from '@/components/TaskPageShell'

// URL: /tasks/new  (CreateTask page)
export const Route = createFileRoute('/tasks/new')({
  beforeLoad: () => { if (!getCurrentUser()) throw redirect({ to: '/login' }) },
  component: CreateTask,
})

function CreateTask() {
  const navigate = useNavigate()
  const addTask = useTasks((s) => s.addTask)
  return (
    <TaskPageShell title="Create task" subtitle="Add a new task to your board.">
      <TaskForm
        submitLabel="Create task"
        onSubmit={(v) => {
          addTask(v.title, v.description, v.status, getCurrentUser()!.id) // linked to the logged-in user
          navigate({ to: '/dashboard' })
        }}
      />
    </TaskPageShell>
  )
}
