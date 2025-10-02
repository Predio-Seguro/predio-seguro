import CreateServiceForm from '@/components/forms/register-service-form'
import HeaderHome from '@/components/header-home'
import React from 'react'

const NewOrdersPage = () => {
  return (
    <div>
        <HeaderHome />
        <div className="p-10">
          <div>
            <CreateServiceForm />
          </div>
        </div>
    </div>
  )
}

export default NewOrdersPage