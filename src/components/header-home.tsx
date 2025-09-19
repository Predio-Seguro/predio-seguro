import { useState } from "react"
import { useLocation } from "react-router-dom"
import ProfileDialog from "./dialogs/profile-dialog"
import api from "../service/api"

const HeaderHome = () => {

  const location = useLocation()
  const pathName = location.pathname
  const [ openProfileDialog, setOpenProfileDialog ] = useState(false)

  const linkClasses = (path: string) =>
    path === pathName 
    ? "text-black border-b-4 font-bold"
    : "transition duration-500 hover:text-black"

  // const getMeUser = async () => {
  //   const token = localStorage.getItem("token")

  //   if (!token) return

  //   const response = await api.get("/profile/me/", {
  //     headers: {
  //       'Authorization': `${token}`
  //     }
  //   })
    
  //   if (response.status === 200) {

  //   }
  // }

  return (
    <nav className="flex p-5 justify-between items-center bg-gradient-to-br from-[#5799FF] to-[#1F4887]">
        <img src="logo-header.png" alt="" />
        <ul className="flex gap-20 text-2xl text-white font-semibold">
            <li className={linkClasses("/home")}><a href="/teams">Equipes</a></li>
            <li className={linkClasses("/orders")}><a href="/orders">Ordem de Serviço</a></li>
            <li className={linkClasses("/history")}><a href="/history">Histórico</a></li>
        </ul>
        <div>
          <button onClick={() => openProfileDialog ? setOpenProfileDialog(false) : setOpenProfileDialog(true)} 
                  className="cursor-pointer">
                  <img src="/profile.png" className="w-16 h-16" /></button>
          <div className="absolute right-5 mt-2">
            {openProfileDialog && <ProfileDialog />}
          </div>
        </div>
    </nav>
  )
}

export default HeaderHome