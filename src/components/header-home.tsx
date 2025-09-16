const HeaderHome = () => {
  return (
    <nav className="flex p-5 justify-around items-center bg-gradient-to-br from-[#5799FF] to-[#1F4887]">
        <img src="logo-header.png" alt="" />
        <ul className="flex gap-20 text-2xl text-white font-semibold">
            <li><a href="">Equipes</a></li>
            <li><a href="">Ordem de Serviço</a></li>
            <li><a href=""></a></li>
        </ul>
        <button className="bg-white py-3 px-10 rounded-2xl text-[#1F4887] cursor-pointer font-bold">Perfil</button>
    </nav>
  )
}

export default HeaderHome