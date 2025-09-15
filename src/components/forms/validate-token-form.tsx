import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../service/api"
import type { ValidateRecoveryTokenForm, ValidateRecoveryTokenRequest } from "../../@types/auth"

const ValidateTokenForm = () => {

    const {register, handleSubmit, formState: { errors }} = useForm<ValidateRecoveryTokenForm>()

    const [ errorMessage, setErrorMessage ] = useState("")

    const navigate = useNavigate()

    const onSubmit = async (data: ValidateRecoveryTokenForm) => {

        const email = sessionStorage.getItem("email")

        if (!email) return
        
        const dataRequest: ValidateRecoveryTokenRequest = {
            code: data.code,
            email: email
        } 

        try {

            const response = await api.post("/auth/validate-recovery-code/", dataRequest)
            
            if (response.status === 200) {
                sessionStorage.setItem("code", data.code)
                localStorage.setItem("token", response.data.temporary_token)
                sessionStorage.removeItem("email")
                navigate("/new-password")
            }

        } catch (error: any) {

            if (error.response.status === 403) {
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
                <span className="text-2xl font-semibold">Código de Recuperação</span>
                <input 
                    type="text"
                    className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                    placeholder="Digite seu código recebido"
                    {...register("code", {
                        required: "Código é obrigatório",
                        minLength: {
                            value: 6,
                            message: "Código deve ter 6 caracteres"
                        },
                    })}
                />
                {errors.code && <span className="text-red-700 font-bold uppercase text-sm">{errors.code.message}</span>}  
            </label>
            <button className="w-96 h-16 bg-[#2D68C3] text-center rounded-2xl font-extrabold text-white 
                                    text-2xl cursor-pointer transition duration-500 hover:bg-[#1B3E75]" type="submit">Avançar</button>
        </form>
    )
}

export default ValidateTokenForm