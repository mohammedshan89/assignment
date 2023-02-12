import React from 'react'
import AddClassForm from '../../components/AddClassForm'
import AdminNavbar from '../../components/AdminNavbar'

const EditClass = () => {
  return (
    <div>
    <AdminNavbar/>
      <AddClassForm edit={"edit"} />
    </div>
  )
}

export default EditClass
