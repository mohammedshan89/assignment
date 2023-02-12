import React from 'react'
import AddcourseForm from '../../components/AddcourseForm'
import AdminNavbar from '../../components/AdminNavbar'

const EditCourse = () => {
  return (
    <div>
    <AdminNavbar/>
      <AddcourseForm edit={"edit"}/>
    </div>
  )
}

export default EditCourse
