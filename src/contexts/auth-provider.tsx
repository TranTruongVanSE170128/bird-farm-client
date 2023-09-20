import useLocalStorage from '@/hooks/use-local-storage'
import { Role, User } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import React, { useContext, useEffect, useState } from 'react'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  user: User | null
  accessToken: string
  role: Role | null
  setAccessToken: (valueOrFn: string) => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useLocalStorage<string>('access_token', '')
  const [role, setRole] = useState<Role | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        setUser(null)
        setRole('guest')
        return
      }
      try {
        const { data } = await birdFarmApi.get('/api/users/who-am-i', {
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`
          }
        })
        if (data?.user) {
          setUser(data.user)
          setRole(data.user.role)
        } else {
          setUser(null)
          setRole('guest')
        }
      } catch (error) {
        setUser(null)
        setRole('guest')
      }
    }

    fetchUser()
  }, [accessToken])

  return <AuthContext.Provider value={{ user, accessToken, setAccessToken, role }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
