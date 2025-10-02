import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MemberListDialog from "../dialogs/member-list-dialog";
import DeleteTeamDialog from "../dialogs/delete-team-dialog";
import { apiTeams } from "@/service/api";
import axios from "axios";

// Tipos
type TeamMember = {
  name: string;
  position: string;
  contact: string;
};

type TeamSummary = {
  id: string;
  name: string;
  specialty: string;
  status: string;
  status_display: string;
  member_count: number;
};

type TeamDetail = {
  id: string;
  name: string;
  specialty: string;
  status: string;
  status_display: string;
  member: TeamMember[];
};

const TeamsTable = () => {
  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTeamSummary, setSelectedTeamSummary] = useState<TeamSummary | null>(null);
  const [selectedTeamDetail, setSelectedTeamDetail] = useState<TeamDetail | null>(null);

  // --- FUNÇÃO CORRIGIDA ---
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    
    const headers: { [key: string]: string } = {
      // Adiciona o header para pular a tela de aviso do Ngrok
      'ngrok-skip-browser-warning': 'true',
    };
  
    if (token) {
      headers.Authorization = token;
    }
    
    return { headers };
  };
  // --- FIM DA CORREÇÃO ---

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await apiTeams.get("/teams", getAuthConfig());
      const data = response.data;

      if (Array.isArray(data)) {
        setTeams(data);
      } else if (data && Array.isArray(data.content)) {
        setTeams(data.content);
      } else {
        console.warn("A resposta da API de equipes não é um array:", data);
        setTeams([]);
      }

    } catch (error) {
      console.error("Falha ao buscar equipes:", error);
      setTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleOpenMembers = async (team: TeamSummary) => {
    setSelectedTeamSummary(team);
    try {
        const response = await apiTeams.get(`/teams/${team.id}/`, getAuthConfig());
        setSelectedTeamDetail(response.data);
        setMemberModalOpen(true);
    } catch (error) {
        alert("Não foi possível carregar os detalhes da equipe.");
        console.error(error);
    }
  };

  const handleOpenDelete = (team: TeamSummary) => {
    setSelectedTeamSummary(team);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTeamSummary) return;
    try {
      await apiTeams.delete(`/teams/${selectedTeamSummary.id}`, getAuthConfig());
      fetchTeams(); 
    } catch (error) {
      alert("Falha ao desativar a equipe.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedTeamSummary(null);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Equipes</h1>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map(team => (
                <TableRow key={team.id}>
                  <TableCell>{team.id}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.specialty}</TableCell>
                  <TableCell>
                    <button onClick={() => handleOpenMembers(team)} className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                      Ver ({team.member_count})
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${team.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                      {team.status_display}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenDelete(team)} className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                    <button onClick={() => navigate(`/equipes/editar/${team.id}`)} className="p-1 hover:bg-gray-100 rounded">
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedTeamDetail && (
          <MemberListDialog 
            isOpen={memberModalOpen}
            onClose={() => setMemberModalOpen(false)}
            team={selectedTeamDetail}
          />
      )}
      {selectedTeamSummary && (
          <DeleteTeamDialog
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            teamName={selectedTeamSummary.name}
          />
      )}
    </>
  );
};

export default TeamsTable;