import React, { useState } from 'react'
import {
  MDBContainer,
  MDBInput,
  
  MDBBtn,

} from "mdb-react-ui-kit";
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddcourseForm = (props) => {   
const location = useLocation()
const _id = location.state

const [coursename,setCourseName] = useState()
const [description,setDescription] = useState()
const navigate = useNavigate()

const handleSubmit = async()=> {
try {
  await axios.post('/api/course',{coursename,description})
  navigate('/admin/course')
} catch (error) {
  console.log(error)
}
}

const handleEdit = async()=> {
  try {
     await axios.patch(`/api/course/${_id}`,{coursename,description})
    navigate('/admin/course')
  } catch (error) {
    
  }
}

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {!props.edit ? <h1>AddCourse</h1> : <h1>EditCourse</h1>}
      <MDBInput
        wrapperClass="mb-4"
        label="CourseName"
        id="form1"
        type="text"
        value={coursename}
        name="coursename"
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Description"
        id="form2"
        type="text"
        value={description}
        name="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      {!props.edit ? (
        <MDBBtn onClick={handleSubmit} className="mb-4">
          Add Course
        </MDBBtn>
      ) : (
        <MDBBtn onClick={handleEdit} className="mb-4">
          Edit Course
        </MDBBtn>
      )}

      <div className="text-center">
        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        ></div>
      </div>
    </MDBContainer>
  );
}

export default AddcourseForm
