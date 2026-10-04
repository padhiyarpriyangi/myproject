import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUser } from '@/store/auth'

// "/" → dashboard if logged in, otherwise the registration page (first page of the flow)
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: getCurrentUser() ? '/dashboard' : '/register' })
  },
})
