import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().toLowerCase().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const taskSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(80, 'Max 80 characters'),
  description: z.string().trim().min(1, 'Description is required').max(300, 'Max 300 characters'),
  status: z.enum(['todo', 'in_progress', 'review', 'completed']),
})

export type RegisterValues = z.infer<typeof registerSchema>
export type LoginValues = z.infer<typeof loginSchema>
export type TaskValues = z.infer<typeof taskSchema>
