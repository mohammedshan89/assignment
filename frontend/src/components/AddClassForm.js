import React, { useEffect, useState } from "react";
import { MDBContainer, MDBInput, MDBBtn,  } from "mdb-react-ui-kit";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddClassForm = (props) => {
  const location = useLocation();
  const _id = location.state; 


  const [courseDeatils,setCourseDetails] = useState()
  const [classname, setClassName] = useState();
  const [coursename, setCourseName] = useState();
  const [date,setDate] = useState()
  const navigate = useNavigate();

 async function getAllDetails() {

   try {
     const courses = await axios.get("/api/course");
     setCourseDetails(courses.data);
     
   } catch (error) {
     console.log(error);
   }
 }

 useEffect(() => {
 
   getAllDetails();
 }, []);


const data = {
  coursename,
  classname,
  date,
};

  const handleAddClass = async () => {
    
    try {
     await axios.post("/api/class", data);
      navigate("/admin/class");
    } catch (error) {
      console.log(error);
    }
  };  

  const handleEdit = async () => {
    try {
      await axios.patch(`/api/class/${_id}`, data);
      navigate("/admin/course");
    } catch (error) {}
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {!props.edit ? <h1>AddClass</h1> : <h1>EditClass</h1>}
      <MDBInput
        wrapperClass="mb-4"
        label="ClassName"
        id="form1" 
        type="text"
        value={classname}
        name="classname"
        onChange={(e) => {
          setClassName(e.target.value);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Date"
        id="form2"
        type="date"
        value={date}
        name="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      
      <div className="inline-block relative w-64">
        <select onChange={(e)=>setCourseName(e.target.value)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option>
            courseName
          </option>
          {
            courseDeatils?.map((course)=>{
              return <option value={course.coursename} key={course._id}>{course.coursename}</option>;
            })
          }
         
        </select>
        
      </div>



      

      {!props.edit ? (
        <MDBBtn onClick={handleAddClass} className="mb-4">
          Add Class
        </MDBBtn>
      ) : (
        <MDBBtn onClick={handleEdit} className="mb-4">
          Edit Edit
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
};

export default AddClassForm;
