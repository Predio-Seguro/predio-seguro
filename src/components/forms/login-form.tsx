import { useForm } from "react-hook-form";
import type { LoginRequest } from "../../@types/auth";
import api from "../../service/api";


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    

    const onSubmit = async (data: LoginRequest) => {

        try{
            const response = await api.post("/auth/login/", data)
            console.log(response.data);

        }catch(error: any) {
            console.log(error.response);
            
        }
        
        
    }
    
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    <span>E-mail</span>
                    <input 
                        type="text"
                        {...register("login", {
                            required: "Usuário é obrigatório"
                        })}
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input 
                        type="password"
                        {...register("password", {
                            required: "Senha é obrigatória"
                        })}
                    />
                </label>
            </div>
            <button type="submit">Entrar</button>
        </form>
    )
}

export default LoginForm