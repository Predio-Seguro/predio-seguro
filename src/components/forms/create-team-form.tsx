import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiTeams } from "@/service/api"; // Verifique se o caminho está correto

type TeamFormData = {
  name: string;
  specialty: string;
};

const CreateTeamForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<TeamFormData>();

  // Função para adicionar os headers de autenticação
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    const headers: { [key: string]: string } = {
      'ngrok-skip-browser-warning': 'true',
    };
    if (token) {
      headers.Authorization = token;
    }
    return { headers };
  };

  const onSubmitTeam = async (data: TeamFormData) => {
    try {
        const response = await apiTeams.post("/teams", data, getAuthConfig());
        alert("Equipe criada com sucesso!");
        // Redireciona para a tela de edição da equipe recém-criada (se a API retornar o ID)
        if (response.data && response.data.id) {
          navigate(`/equipes/editar/${response.data.id}`);
        } else {
          navigate("/equipes"); // Ou volta para a lista
        }
    } catch (error) {
        alert("Falha ao criar a equipe.");
        console.error(error);
    }
  };

  const labelStyles = "font-bold text-lg text-gray-700";
  const inputStyles = "w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition";
  const errorStyles = "text-red-600 font-bold text-sm mt-1";

  return (
    <div className="w-full max-w-xl mx-auto p-8 my-10 bg-white border rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmitTeam)}>
        <h1 className="text-4xl font-bold text-center text-[#0D47A1] mb-10">Criar Nova Equipe</h1>
        
        <div className="flex flex-col gap-8 mb-10">
          <div>
            <label htmlFor="teamName" className={labelStyles}>Nome da Equipe</label>
            <input id="teamName" {...register("name", { required: "Nome é obrigatório" })} className={inputStyles} placeholder="Ex: Eletricistas Prediais"/>
            {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="specialty" className={labelStyles}>Especialidade</label>
            <input id="specialty" {...register("specialty", { required: "Especialidade é obrigatória" })} className={inputStyles} placeholder="Ex: ELETRICA"/>
            {errors.specialty && <p className={errorStyles}>{errors.specialty.message}</p>}
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-6 mt-12">
            <button type="button" onClick={() => navigate(-1)} className="w-48 h-14 bg-red-600 text-white font-bold text-xl rounded-lg shadow-md transition-colors hover:bg-red-700">
              Cancelar
            </button>
            <button type="submit" className="w-48 h-14 bg-green-500 text-white font-bold text-xl rounded-lg shadow-md transition-colors hover:bg-green-600">
              Criar Equipe
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;