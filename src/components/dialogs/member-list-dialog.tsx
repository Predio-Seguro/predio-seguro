import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Tipos definidos para corresponder à API
type TeamMember = {
  name: string;
  position: string;
  contact: string;
};

type TeamDetail = {
  id: string;
  name: string;
  specialty: string;
  status: string;
  status_display: string;
  member: TeamMember[]; // A propriedade correta é 'member' (singular)
};


type MemberListDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  team: TeamDetail; // O tipo da prop agora é TeamDetail
};

const MemberListDialog = ({ isOpen, onClose, team }: MemberListDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-[#0D47A1] mb-2">Membros da Equipe</h2>
        <p className="text-center text-lg text-gray-600 mb-6">{team.name}</p>
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
              {/* CORREÇÃO: Usando team.member em vez de team.members */}
              {team.member.length > 0 ? (
                team.member.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
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