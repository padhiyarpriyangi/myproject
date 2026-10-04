import { useState } from 'react'
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterValues } from '@/lib/schemas'
import { getCurrentUser, useAuth } from '@/store/auth'
import { AuthShell } from '@/components/AuthShell'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'

export const Route = createFileRoute('/register')({
  beforeLoad: () => { if (getCurrentUser()) throw redirect({ to: '/dashboard' }) },
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useAuth((s) => s.register)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = ({ name, email, password }: RegisterValues) => {
    const res = registerUser({ name, email, password }) // data stored in the users store (localStorage)
    if (!res.ok) return setError(res.error)
    navigate({ to: '/login' })                           // next page → login
  }

  return (
    <AuthShell title="Create your account" subtitle="Register to start organising your tasks.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        <Field label="Full name" error={errors.name?.message}><Input placeholder="Priyangi Padhiyar" autoComplete="name" {...register('name')} /></Field>
        <Field label="Email" error={errors.email?.message}><Input type="email" placeholder="you@example.com" autoComplete="email" {...register('email')} /></Field>
        <Field label="Password" error={errors.password?.message}><Input type="password" placeholder="Minimum 6 characters" autoComplete="new-password" {...register('password')} /></Field>
        <Field label="Confirm password" error={errors.confirmPassword?.message}><Input type="password" placeholder="Repeat password" autoComplete="new-password" {...register('confirmPassword')} /></Field>
        <Button type="submit" className="w-full" disabled={isSubmitting}>Create account</Button>
        <p className="text-center text-sm text-slate-500">
          Already registered? <Link to="/login" className="font-medium text-indigo-600 hover:underline">Log in</Link>
        </p>
      </form>
    </AuthShell>
  )
}
