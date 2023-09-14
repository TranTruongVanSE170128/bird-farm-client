import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
function SignIn() {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login-google`, {
        accessTokenGoogle: codeResponse.access_token
      })

      const accessToken = data.accessToken
      console.log(accessToken)

      localStorage.setItem('access_token', accessToken)
    }
  })

  return <main>SignIn</main>
}

export default SignIn
