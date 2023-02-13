
import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


const AdLogin = (props) => {
 const [error,setError] = useState(Boolean)
const [email, setEmail] = useState('')
const [password,setPassword] = useState('')
const navigate = useNavigate()
const data = {
  email,password
}


const handleSubmit = async(e)=> {
  e.preventDefault()
try{
const res =  await axios.post('/api/admin/login',data)
console.log(res)
if(res.data){
  navigate('/admin/home')
}else{
  navigate('/admin')
}
}catch(error){
  console.log(error)
}
}

const handleUserSubmit = async(e)=> {
  e.preventDefault()
  try{
     const user = await axios.post("/api/user/login",data)

    if(user.data){
  navigate('/home')
    }
  

  }catch(error){
    if(error.response.data.error==="under process"){
      setError(true);
    }
  }
  setEmail('')
  setPassword('')
}

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    {error?<h1>Your application is under checking</h1>:''}
      {!props.user ? <h1>AdminLogin</h1> : <h1>UserLogin</h1>}
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        value={email}
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        value={password}
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
      </div>

      {!props.user ? (
        <MDBBtn onClick={handleSubmit} className="mb-4">
          Sign in
        </MDBBtn>
      ) : (
        <MDBBtn onClick={handleUserSubmit} className="mb-4">
          UserLogin
        </MDBBtn>
      )}

      <div className="text-center">
        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default AdLogin
