type DeleteTeamDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
};

const DeleteTeamDialog = ({ isOpen, onClose, onConfirm, teamName }: DeleteTeamDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-white w-full max-w-md p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Deletar equipe</h2>
        <p className="text-lg font-semibold text-gray-800 mb-2">"{teamName}"</p>
        <p className="text-gray-600 mb-8">Tem certeza que deseja excluir esta equipe?</p>
        <div className="flex justify-center gap-6">
          <button onClick={onClose} className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors hover:bg-gray-300">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-colors hover:bg-red-700">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamDialog;