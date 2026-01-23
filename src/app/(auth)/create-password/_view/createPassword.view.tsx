import { CreatePasswordForm } from "@/features/auth/create-password/createPassword.fornt"


type CreatePasswordViewProps = {
  token: string
}

const CreatePasswordView = ({ token }: CreatePasswordViewProps) => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreatePasswordForm token={token} />
      </div>
    </div>
  )
}

export default CreatePasswordView