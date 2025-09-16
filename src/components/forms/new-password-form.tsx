import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { NewPasswordForm, NewPasswordRequest } from "../../@types/auth";
import api from "../../service/api";

const NewPasswordForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordForm>();
    const [ errorMessage, setErrorMessage ] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (data: NewPasswordForm) => {

        const code = sessionStorage.getItem("code")
        const token = localStorage.getItem("token")

        if (!code) return

        const newPasswordRequest: NewPasswordRequest = {
            confirm_new_password: data.confirm_new_password,
            new_password: data.new_password,
            code: code
        } 

        try {

            const response = await api.patch("/auth/recovery-password/", newPasswordRequest, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            if (response.status === 200) {
                navigate("/")
            }

        } catch (error: any) {

            if (error.response.status === 401) {
                setErrorMessage(error.response.data.detail)
            }else {
                setErrorMessage("Erro do sistema tente novamente.")
            }
            
        } 
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            {errorMessage && <span className="text-sm text-red-700 font-bold mb-6 uppercase">{errorMessage}</span>}
            <div className="flex flex-col gap-12 mb-16">
                <label className="flex flex-col gap-3">
                    <span className="text-2xl font-semibold">Nova Senha</span>
                    <input 
                        type="password"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite sua nova senha"
                        {...register("new_password", {
                            required: "Nova senha é obrigatória",
                            minLength: {
                                value: 8,
                                message: "Senha deve ter no mínimo 8 caracteres"
                            }
                        })}
                    />
                    {errors.new_password && <span className="text-red-700 font-bold uppercase text-sm">{errors.new_password.message}</span>}
                </label>
                <label className="flex flex-col gap-3">
                    <span className="text-2xl font-semibold">Confirme a Nova Senha</span>
                    <input 
                        type="password"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Confirme sua nova senha"
                        {...register("confirm_new_password", {
                            required: "Confirmação da Senha é obrigatória",
                            minLength: {
                                value: 8,
                                message: "Senha deve ter no mínimo 8 caracteres"
                            },
                        })}
                    />
                    {errors.confirm_new_password && <span className="text-red-700 font-bold uppercase text-sm">{errors.confirm_new_password.message}</span>}
                </label>
            </div>
            <button className="w-96 h-16 bg-[#2D68C3] text-center rounded-2xl font-extrabold text-white 
                            text-2xl cursor-pointer transition duration-500 hover:bg-[#1B3E75]" type="submit">Confirmar Senha</button>
        </form>
  )
}

export default NewPasswordForm