import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { getCurrentUser } from '@/store/auth'
import { useTasks } from '@/store/tasks'
import { TaskForm } from '@/components/TaskForm'
import { TaskPageShell } from '@/components/TaskPageShell'

// URL: /tasks/<id>/edit  (EditTask page)
export const Route = createFileRoute('/tasks/$taskId/edit')({
  beforeLoad: ({ params }) => {
    const user = getCurrentUser()
    if (!user) throw redirect({ to: '/login' })
    const task = useTasks.getState().tasks.find((t) => t.id === params.taskId)
    if (!task || task.userId !== user.id) throw redirect({ to: '/dashboard' }) // can only edit your own tasks
  },
  component: EditTask,
})

function EditTask() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const task = useTasks((s) => s.tasks.find((t) => t.id === taskId))
  const updateTask = useTasks((s) => s.updateTask)
  if (!task) return null
  return (
    <TaskPageShell title="Edit task" subtitle="Update the details or change the status.">
      <TaskForm
        task={task}
        submitLabel="Save changes"
        onSubmit={(v) => {
          updateTask(task.id, v.title, v.description, v.status)
          navigate({ to: '/dashboard' })
        }}
      />
    </TaskPageShell>
  )
}
