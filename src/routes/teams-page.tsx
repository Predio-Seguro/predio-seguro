import HeaderHome from "../components/header-home"
import TeamsTable from "@/components/tables/teams-table"

const TeamsPage = () => {
  return (
    <div>
        <HeaderHome />
        <div className="p-10">
          <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                  <h2 className="text-[#2D68C3] font-extrabold text-5xl max-2xl:text-4xl">Lista de Equipes</h2>
                  <p className="font-medium text-3xl max-2xl:text-2xlnpx shadcn@latest init">Visualize e gerencia suas equipes</p>
              </div>
              <div>
                <a href="/create-team"><button className="px-3 py-5 text-center rounded-2xl font-extrabold text-white text-2xl bg-[#2D68C3] cursor-pointer
                              transition duration-500 hover:bg-[#1B3E75]">
                  Criar Equipe</button></a>
              </div>
          </div>
          <div>
            <TeamsTable />
          </div>
        </div>
    </div>
  )
}

export default TeamsPage