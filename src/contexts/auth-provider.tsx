import useLocalStorage from '@/hooks/use-local-storage'
import { User } from '@/lib/types'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = { user: User | null; accessToken: string; setAccessToken: (valueOrFn: string) => void }

export const AuthContext = React.createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { localStorageValue: accessToken, setLocalStorageStateValue: setAccessToken } = useLocalStorage<string>(
    'access_token',
    ''
  )

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token')

      if (!accessToken) {
        return
      }

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/who-am-i`, {
        headers: {
          Authorization: `Bearer ${accessToken.toString()}`
        }
      })

      if (data?.user) {
        setUser(data.user)
      }
    }

    fetchUser()
  }, [accessToken])

  useEffect(() => {
    console.log({ user })
  }, [user])

  return <AuthContext.Provider value={{ user, accessToken, setAccessToken }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
