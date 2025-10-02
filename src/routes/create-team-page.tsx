import CreateTeamForm from '@/components/forms/create-team-form'
import CreateServiceForm from '@/components/forms/register-service-form'
import HeaderHome from '@/components/header-home'
import React from 'react'

const CreateTeamPage = () => {
  return (
    <div>
        <HeaderHome />
        <div className="p-10">
          <div>
            <CreateTeamForm />
          </div>
        </div>
    </div>
  )
}

export default CreateTeamPage