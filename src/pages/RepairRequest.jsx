import React from 'react'
import Navbar from '../components/Navbar'
import RequestForRepair from '../components/utils/RepairRequestForm'

function RepairRequest() {
  return (
    <div>
        <Navbar />
        <div className="container mx-auto pt-20 px-4">
            <RequestForRepair />
        </div>
    </div>
  )
}

export default RepairRequest