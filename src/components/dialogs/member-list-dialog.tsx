import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type Member = {
  id: string;
  name: string;
  role: string;
  contact: string;
};

export type Team = {
  id: string;
  name: string;
  specialty: string;
  status: "Ativo" | "Inativo";
  members: Member[];
};

type MemberListDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
};

const MemberListDialog = ({ isOpen, onClose, team }: MemberListDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-[#0D47A1] mb-6">Lista de Membros</h2>
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Contato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.members.length > 0 ? (
                team.members.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.contact}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    Nenhum membro cadastrado nesta equipe.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="text-center">
          <button onClick={onClose} className="w-48 h-14 bg-blue-600 text-white font-bold text-xl rounded-lg shadow-md transition-colors hover:bg-blue-700">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberListDialog;