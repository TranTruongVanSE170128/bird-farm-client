import logo from '@/assets/logo-purple-dark.png'
import background from '@/assets/bg-auth.png'
import icon from '@/assets/icon.png'
import { SignInForm } from '@/components/forms/sign-in-form'

function SignUp() {
  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login-google`, {
  //       accessTokenGoogle: codeResponse.access_token
  //     })

  //     const accessToken = data.accessToken
  //     console.log(accessToken)

  //     localStorage.setItem('access_token', accessToken)
  //   }
  // })
  return (
    <main>
      <div className='container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div
            style={{
              backgroundImage: `url(${background})`
            }}
            className='absolute inset-0 bg-left-top bg-cover'
          />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img alt='logo' className='h-20' src={logo} />
          </div>
        </div>
        <div className='lg:p-8 py-4'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Đăng nhập</h1>
              <p className='text-sm text-muted-foreground'>
                để tiếp tục với <img className='w-5 h-5 mb-1 inline' alt='icon' src={icon} /> Bird Farm Shop
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp
