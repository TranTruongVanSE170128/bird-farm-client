import { User } from '@/lib/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token')

      if (!accessToken) {
        return
      }

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/who-am-i`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (data?.user) {
        setUser(data.user)
      }
    }

    fetchUser()
  }, [])
  return user
}

export default useAuth
