import HeaderHome from '@/components/header-home'
import HistoryTable from '@/components/tables/history-table'
import React from 'react'

const HistoryPage = () => {
  return (
    <div>
        <HeaderHome />
        <div className="p-10">
          <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                  <h2 className="text-[#2D68C3] font-extrabold text-5xl max-2xl:text-4xl">Histórico</h2>
                  <p className="font-medium text-3xl max-2xl:text-2xlnpx shadcn@latest init">Visualize seu histórico</p>
              </div>
          </div>
          <div>
            <HistoryTable />
          </div>
        </div>
    </div>
  )
}

export default HistoryPage