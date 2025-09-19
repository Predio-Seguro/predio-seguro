
interface ProfileMeDialogProps {
  onClose: () => void 
}

const ProfileMeDialog = ( { onClose }: ProfileMeDialogProps ) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white py-10 px-10" onClick={(e) => e.stopPropagation()}>
        <h2>Meu Perfil</h2>
        <p>Nome: </p>
        <p>E-mail: </p>
        <p>Telefone: </p>
        <div>
          <button>Alterar Senha</button>
          <button>Voltar</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileMeDialog