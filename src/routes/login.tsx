import { useState } from 'react'
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginValues } from '@/lib/schemas'
import { getCurrentUser, useAuth } from '@/store/auth'
import { AuthShell } from '@/components/AuthShell'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'

export const Route = createFileRoute('/login')({
  beforeLoad: () => { if (getCurrentUser()) throw redirect({ to: '/dashboard' }) },
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const login = useAuth((s) => s.login)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = ({ email, password }: LoginValues) => {
    const res = login(email, password)
    if (!res.ok) return setError(res.error)
    navigate({ to: '/dashboard' })
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in with your email and password.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        <Field label="Email" error={errors.email?.message}><Input type="email" placeholder="you@example.com" autoComplete="email" {...register('email')} /></Field>
        <Field label="Password" error={errors.password?.message}><Input type="password" placeholder="Your password" autoComplete="current-password" {...register('password')} /></Field>
        <Button type="submit" className="w-full">Log in</Button>
        <p className="text-center text-sm text-slate-500">
          New here? <Link to="/register" className="font-medium text-indigo-600 hover:underline">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  )
}
