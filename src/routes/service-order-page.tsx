import HeaderHome from "../components/header-home"

const ServiceOrderPage = () => {
  return (
    <div>
        <HeaderHome />
        <div className="p-10">

          <div className="absolute top-20 inset-0 flex justify-center items-center pointer-events-none">
            <img 
              src="logo-background.png" 
              alt="background logo" 
            />
          </div>

          <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                  <h2 className="text-[#2D68C3] font-extrabold text-5xl">Ordem de Serviço</h2>
                  <p className="font-medium text-3xl">Visualize e gerencia suas ordens de serviços</p>
              </div>
              <div>
                <button className="px-3 py-5 text-center rounded-2xl font-extrabold text-white text-2xl bg-[#2D68C3] cursor-pointer
                              transition duration-500 hover:bg-[#1B3E75]">
                  Criar Serviço</button>
              </div>
          </div>
          <div></div>
        </div>
    </div>
  )
}

export default ServiceOrderPage