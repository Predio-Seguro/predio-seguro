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


// Tipos definidos diretamente no arquivo
export type Member = {
  id: string;
  name: string;
  role: string; // Cargo
  contact: string;
};

export type Team = {
  id: string;
  name: string;
  specialty: string;
  status: "Ativo" | "Inativo";
  members: Member[];
};

const mockTeams: Team[] = [
    { id: "01", name: "Eletricistas Prediais", specialty: "Eletricista", status: "Ativo", members: [
      { id: "m1", name: "Francisco Rafael", role: "Gerente", contact: "(83) 98888-7777" },
      { id: "m2", name: "Everton Candido", role: "Eletricista Sênior", contact: "(83) 91111-2222" },
    ]},
    { id: "02", name: "Hidráulica PRO", specialty: "Encanador", status: "Inativo", members: [
      { id: "m3", name: "Ana Silva", role: "Encanadora", contact: "(83) 93333-4444" },
    ]},
    { id: "03", name: "Jardineiros & Cia", specialty: "Jardinagem", status: "Ativo", members: [] },
  ];

const TeamsTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTeams(mockTeams);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleOpenMembers = (team: Team) => {
    setSelectedTeam(team);
    setMemberModalOpen(true);
  };

  const handleOpenDelete = (team: Team) => {
    setSelectedTeam(team);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTeam) return;
    setTeams(prev => prev.filter(t => t.id !== selectedTeam.id));
    setDeleteModalOpen(false);
    setSelectedTeam(null);
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
                <TableHead>List. Membro</TableHead>
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
                      Membros
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${team.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>
                      {team.status}
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

      {selectedTeam && (
        <>
          <MemberListDialog 
            isOpen={memberModalOpen}
            onClose={() => setMemberModalOpen(false)}
            team={selectedTeam}
          />
          <DeleteTeamDialog
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            teamName={selectedTeam.name}
          />
        </>
      )}
    </>
  );
};

export default TeamsTable;