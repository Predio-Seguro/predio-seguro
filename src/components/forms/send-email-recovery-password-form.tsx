import { useForm } from "react-hook-form"
import type { SendEmailRecorevyPasswordRequest } from "../../@types/auth"
import { useState } from "react"
import api from "../../service/api"
import { useNavigate } from "react-router-dom"

const SendEmailRecoveryPasswordForm = () => {
  
  const {register, handleSubmit, formState: { errors }} = useForm<SendEmailRecorevyPasswordRequest>()

  const [ errorMessage, setErrorMessage ] = useState("")

  const navigate = useNavigate()

  const onSubmit = async (data: SendEmailRecorevyPasswordRequest) => {
    
    try {

        const response = await api.post("/auth/send-email-recovery-password/", data)
        if (response.status === 200) {
            sessionStorage.setItem("email", data.email)
            navigate("/validate-token")
        }

    } catch (error: any) {

        if (error.response.status === 409) {
            setErrorMessage(error.response.data.detail)
        }else {
            setErrorMessage("Erro do sistema tente novamente.")
        }
        
    } 
      
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      {errorMessage && <span className="text-sm text-red-700 font-bold mb-6 uppercase">{errorMessage}</span>}
      <label className="flex flex-col gap-3 mb-16">
        <span className="text-2xl font-semibold">E-mail</span>
        <input 
            type="text"
            className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
            placeholder="Digite seu e-mail cadastrado"
            {...register("email", {
                required: "E-mail é obrigatório",
                minLength: {
                    value: 3,
                    message: "E-mail deve ter no mínimo 3 caracteres"
                }
            })}
        />
        {errors.email && <span className="text-red-700 font-bold uppercase text-sm">{errors.email.message}</span>}  
      </label>
      <button className="w-96 h-16 bg-[#2D68C3] text-center rounded-2xl font-extrabold text-white 
                            text-2xl cursor-pointer transition duration-500 hover:bg-[#1B3E75]" type="submit">Avançar</button>
    </form>
  )
}

export default SendEmailRecoveryPasswordForm