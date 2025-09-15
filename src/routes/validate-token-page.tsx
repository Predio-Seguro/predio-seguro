import ValidateTokenForm from "../components/forms/validate-token-form"

const ValidateTokenPage = () => {
  return (
    <div className="flex h-screen items-center justify-between">
        <img src="login-banner-image.png" className="h-screen w-[40%] object-cover" />
        <div className="w-[60%] flex flex-col items-center justify-center gap-14">
          <h2 className="text-center text-[#2D68C3] font-bold text-6xl">Olá! <br/> Recupere sua conta</h2>
          <ValidateTokenForm />
        </div>
    </div>
  )
}

export default ValidateTokenPage