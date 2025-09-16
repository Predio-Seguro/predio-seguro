import { useForm } from "react-hook-form";
import type { LoginRequest } from "../../@types/auth";
import api from "../../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const [ errorMessage, setErrorMessage ] = useState("")
    const navigate = useNavigate()
    

    const onSubmit = async (data: LoginRequest) => {

        try {

            const response = await api.post("/auth/login/", data)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token)
                navigate("/home")
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
            <div className="flex flex-col gap-12 mb-2.5">
                <label className="flex flex-col gap-3">
                    <span className="text-2xl font-semibold">Nome de Usuário</span>
                    <input 
                        type="text"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite seu nome de usuário"
                        {...register("login", {
                            required: "Usuário é obrigatório",
                            minLength: {
                                value: 3,
                                message: "Nome de usuário deve ter no mínimo 3 caracteres"
                            }
                        })}
                    />
                    {errors.login && <span className="text-red-700 font-bold uppercase text-sm">{errors.login.message}</span>}
                </label>
                <label className="flex flex-col gap-3">
                    <span className="text-2xl font-semibold">Senha</span>
                    <input 
                        type="password"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite sua senha"
                        {...register("password", {
                            required: "Senha é obrigatória",
                            minLength: {
                                value: 8,
                                message: "Senha deve ter no mínimo 8 caracteres"
                            },
                        })}
                    />
                    {errors.password && <span className="text-red-700 font-bold uppercase text-sm">{errors.password.message}</span>}
                </label>
            </div>
            <a href="/email-recovery-password" className="mb-16 w-full  text-left font-bold transition duration-500 text-[#2D68C3] hover:text-[#1B3E75]">Esqueceu a senha?</a>
            <button className="w-96 h-16 mb-3 bg-[#2D68C3] text-center rounded-2xl font-extrabold text-white 
                            text-2xl cursor-pointer transition duration-500 hover:bg-[#1B3E75]" type="submit">Entrar</button>
            <p className="font-bold">Já possui uma conta? <a href="/register" className="mb-16 w-full text-left font-bold transition duration-500 text-[#2D68C3] hover:text-[#1B3E75]">cadastre-se</a></p>
        </form>
    )
}

export default LoginForm