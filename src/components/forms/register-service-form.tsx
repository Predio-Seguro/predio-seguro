import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiOrderService } from "../../service/api";
import axios from "axios";

type CreateServiceRequest = {
  descriptionOfTheProblem: string;
  location: string;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  teamID: string; 
};

type Team = {
  id: string;
  name: string;
};

const CreateServiceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateServiceRequest>();
  const [errorMessage, setErrorMessage] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setTeams([
          { id: "550e8400-e29b-41d4-a716-446655740000", name: "Equipe Alpha" },
          { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: "Equipe Beta" },
          { id: "a3d8c1b2-0e1a-4f5c-8a9d-3b4c5d6e7f80", name: "Equipe Gamma" },
        ]);
      } catch (error) {
        console.error("Erro ao buscar equipes:", error);
        setErrorMessage("Não foi possível carregar as equipes.");
      }
    };
    fetchTeams();
  }, []);

  const onSubmit = async (data: CreateServiceRequest) => {
    try {
      const response = await apiOrderService.post("/service-orders/create", data);
      if (response.status === 201) {
        navigate("/orders"); 
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Não foi possível cadastrar o serviço.");
      } else {
        setErrorMessage("Erro do sistema, tente novamente.");
      }
    }
  };

  const labelStyles = "font-bold text-lg text-gray-700";
  const inputStyles = "w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition";
  const errorStyles = "text-red-600 font-bold text-sm mt-1";

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white">
      <h1 className="text-4xl font-bold text-center text-[#0D47A1] mb-10">Cadastre o Serviço</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <div className="text-center text-red-600 font-bold mb-6 uppercase">{errorMessage}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
          
          <div className="flex flex-col gap-8">
            <div>
              <label htmlFor="description" className={labelStyles}>Descrição</label>
              <textarea
                id="description"
                rows={5}
                className={`${inputStyles} resize-none`}
                placeholder="Descreva o serviço"
                {...register("descriptionOfTheProblem", {
                  required: "A descrição é obrigatória",
                })}
              />
              {errors.descriptionOfTheProblem && <p className={errorStyles}>{errors.descriptionOfTheProblem.message}</p>}
            </div>
            <div>
              <label htmlFor="location" className={labelStyles}>Local</label>
              <input
                id="location"
                type="text"
                className={inputStyles}
                placeholder="Digite o Local do Serviço"
                {...register("location", {
                  required: "O local é obrigatório",
                })}
              />
              {errors.location && <p className={errorStyles}>{errors.location.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <label htmlFor="priority" className={labelStyles}>Prioridade</label>
              <select
                id="priority"
                className={inputStyles}
                {...register("priority", { required: "A prioridade é obrigatória" })}
              >
                <option value="">Selecione a prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
              {errors.priority && <p className={errorStyles}>{errors.priority.message}</p>}
            </div>
            <div>
              <label htmlFor="team" className={labelStyles}>Equipe</label>
              <select
                id="team"
                className={inputStyles}
                {...register("teamID", { required: "A equipe é obrigatória" })}
                disabled={teams.length === 0}
              >
                <option value="">Selecione a equipe responsável</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
              {errors.teamID && <p className={errorStyles}>{errors.teamID.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-48 h-14 bg-red-600 text-white font-bold text-xl rounded-lg shadow-md cursor-pointer transition-colors duration-200 hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-48 h-14 bg-green-500 text-white font-bold text-xl rounded-lg shadow-md cursor-pointer transition-colors duration-200 hover:bg-green-600"
            >
              Cadastrar
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceForm;   