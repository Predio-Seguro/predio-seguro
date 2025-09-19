import { useNavigate } from "react-router-dom"
import api from "../../service/api"
import { useState } from "react"
import ProfileMeDialog from "./profile-me-dialog"

interface ProfileDialogProps {
  name: string
}

const ProfileDialog = ({name}: ProfileDialogProps) => {

  const [ openMeProfile, setOpenMeProfile ] = useState(false)

  const navigate = useNavigate()

  const onLogoutButtonClick = async () => {

    const token = localStorage.getItem("token")

    if (!token) return

    const response = await api.post("/profile/logout/", null, {
      headers: {
        'Authorization': `${token}`
      }
    })
    
    if (response.status === 204) {
      localStorage.removeItem("token")
      navigate("/")
    }

  }

  return (
    <div className="bg-[#EBE6E6] rounded-2xl py-8 px-8 flex flex-col items-center gap-5">
      <h2 className="font-bold text-[18px]">{name}Kauê Batista</h2>
      <div className="flex flex-col gap-2.5 font-semibold text-white">
        <button onClick={() => setOpenMeProfile(true)} className="py-2 px-6 rounded-2xl bg-[#5799FF] cursor-pointer transition duration-500 hover:bg-[#1F4887]">Informações</button>
        <button onClick={onLogoutButtonClick} className="py-2 px-6 rounded-2xl bg-[#FF0000] cursor-pointer transition duration-500 hover:bg-[#990000]">Sair</button>
      </div>
      {openMeProfile && <ProfileMeDialog onClose={() => setOpenMeProfile(false)} />}
    </div>
  )
}

export default ProfileDialog