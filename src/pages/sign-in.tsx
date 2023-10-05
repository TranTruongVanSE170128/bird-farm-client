import logo from '@/assets/logo-purple-dark.png'
import background from '@/assets/bg-auth.png'
import icon from '@/assets/icon.png'
import { SignInForm } from '@/components/forms/sign-in-form'

function SignUp() {
  return (
    <main>
      <div className='container relative grid flex-col items-center justify-center min-h-screen lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex'>
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
        <div className='py-4 lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Đăng nhập</h1>
              <p className='text-sm text-muted-foreground'>
                để tiếp tục với <img className='inline w-5 h-5 mb-1' alt='icon' src={icon} /> Bird Farm Shop
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
