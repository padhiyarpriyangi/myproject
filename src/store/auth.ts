import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { uid } from '@/lib/utils'

export interface User { id: string; name: string; email: string; password: string }

interface AuthState {
  users: User[]            // every registered user (stored in localStorage)
  currentUserId: string | null
  register: (d: Omit<User, 'id'>) => { ok: true } | { ok: false; error: string }
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

// NOTE: demo only — a real app must hash passwords on a server. Here data is kept in localStorage.
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,
      register: (d) => {
        if (get().users.some((u) => u.email === d.email)) return { ok: false, error: 'This email is already registered' }
        set({ users: [...get().users, { ...d, id: uid() }] })
        return { ok: true }
      },
      login: (email, password) => {
        const user = get().users.find((u) => u.email === email)
        if (!user) return { ok: false, error: 'No account found with this email. Please register first.' }
        if (user.password !== password) return { ok: false, error: 'Incorrect password' }
        set({ currentUserId: user.id })
        return { ok: true }
      },
      logout: () => set({ currentUserId: null }),
    }),
    { name: 'unisphere-auth' },
  ),
)

export const getCurrentUser = () => {
  const { users, currentUserId } = useAuth.getState()
  return users.find((u) => u.id === currentUserId) ?? null
}
