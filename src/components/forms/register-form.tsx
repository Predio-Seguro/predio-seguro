import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../../@types/auth";
import api from "../../service/api";

const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
    const [ errorMessage, setErrorMessage ] = useState("")
    const navigate = useNavigate()
    

    const onSubmit = async (data: RegisterRequest) => {

        try {

            const response = await api.post("/auth/register/", data)
            if (response.status === 201) {
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
            <div className="flex flex-col gap-3 mb-6">
                <label className="flex flex-col gap-1.5">
                    <span className="text-2xl font-semibold">Nome</span>
                    <input 
                        type="text"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite seu nome"
                        {...register("name", {
                            required: "Nome é obrigatório",
                            minLength: {
                                value: 3,
                                message: "Nome deve ter no mínimo 3 caracteres"
                            }
                        })}
                    />
                    {errors.name && <span className="text-red-700 font-bold uppercase text-sm">{errors.name.message}</span>}
                </label>
                <label className="flex flex-col gap-1.5">
                    <span className="text-2xl font-semibold">Nome de Usuário</span>
                    <input 
                        type="text"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite seu nome de usuário"
                        {...register("username", {
                            required: "Usuário é obrigatório",
                            minLength: {
                                value: 3,
                                message: "Nome de usuário deve ter no mínimo 3 caracteres"
                            }
                        })}
                    />
                    {errors.username && <span className="text-red-700 font-bold uppercase text-sm">{errors.username.message}</span>}
                </label>
                <label className="flex flex-col gap-1.5">
                    <span className="text-2xl font-semibold">E-mail</span>
                    <input 
                        type="text"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite seu e-mail"
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
                <label className="flex flex-col gap-1.5">
                    <span className="text-2xl font-semibold">Telefone</span>
                    <input 
                        type="text"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Digite seu telefone"
                        {...register("phone_number", {
                            required: "Telefone é obrigatório",
                            minLength: {
                                value: 11,
                                message: "Telefone deve ter no mínimo e no maximo 11 caracteres"
                            }
                        })}
                    />
                    {errors.phone_number && <span className="text-red-700 font-bold uppercase text-sm">{errors.phone_number.message}</span>}
                </label>
                <label className="flex flex-col gap-1.5">
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
                <label className="flex flex-col gap-1.5">
                    <span className="text-2xl font-semibold">Confirme a Senha</span>
                    <input 
                        type="password"
                        className="w-lg border p-4 rounded-[10px] shadow-[4px_4px_6px_rgba(0,0,0,0.2)]"
                        placeholder="Confirme sua senha"
                        {...register("confirm_password", {
                            required: "Senha é obrigatória",
                            minLength: {
                                value: 8,
                                message: "Senha deve ter no mínimo 8 caracteres"
                            },
                        })}
                    />
                    {errors.confirm_password && <span className="text-red-700 font-bold uppercase text-sm">{errors.confirm_password.message}</span>}
                </label>
            </div>
            <button className="w-96 h-16 mb-3 bg-[#2D68C3] text-center rounded-2xl font-extrabold text-white 
                            text-2xl cursor-pointer transition duration-500 hover:bg-[#1B3E75]" type="submit">Cadastrar</button>
            <p className="font-bold">Já possui uma conta? <a href="/" className="mb-16 w-full text-left font-bold transition duration-500 text-[#2D68C3] hover:text-[#1B3E75]">entre</a></p>
        </form>
  )
}

export default RegisterForm