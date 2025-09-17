import { useLocation } from "react-router-dom"

const HeaderHome = () => {

  const location = useLocation()
  const pathName = location.pathname

  const linkClasses = (path: string) =>
    path === pathName 
    ? "text-black border-b-4"
    : "transition duration-500 hover:text-black"

  return (
    <nav className="flex p-5 justify-between items-center bg-gradient-to-br from-[#5799FF] to-[#1F4887]">
        <img src="logo-header.png" alt="" />
        <ul className="flex gap-20 text-2xl text-white font-semibold">
            <li className={linkClasses("/home")}><a href="/teams">Equipes</a></li>
            <li className={linkClasses("/order")}><a href="">Ordem de Serviço</a></li>
            <li className={linkClasses("/history")}><a href="">Histórico</a></li>
        </ul>
        <button className="bg-white py-3 px-10 rounded-2xl text-[#1F4887] cursor-pointer font-bold">Perfil</button>
    </nav>
  )
}

export default HeaderHome