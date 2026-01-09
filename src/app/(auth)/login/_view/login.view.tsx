import { LoginForm } from '@/features/auth/login/login.form'

const LoginView = () => {
  return (
     <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginView
