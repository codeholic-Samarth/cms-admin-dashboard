import CreatePasswordView from "./_view/createPassword.view"

type CreatePasswordPageProps = {
  searchParams?: {
    token?: string
  }
}

const CreatePasswordPage = ({ searchParams }: CreatePasswordPageProps) => {
  const token = searchParams?.token || null

  if (!token) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-destructive">
          Invalid or missing password reset token
        </p>
      </div>
    )
  }

  return <CreatePasswordView token={token} />
}

export default CreatePasswordPage