import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const AuthenticationForm = () => {
  
 const [courseDetails, setcourseDetails] = useState([]);

const [email, setEmail] = useState()
const [name,setName] = useState()
const [course,setCourse] = useState()
const [password,setPassword] = useState()
const [approved,setApproved] = useState(Boolean)
const data = {email,name,course,password}

async function getAllDetails() {
  try {
    const courses = await axios.get("/api/course");

    setcourseDetails(courses.data);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getAllDetails();
}, []);


const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
    const user = await axios.post("api/user/signup", data);
    if(user.data.message){
     setApproved(true)
     setCourse('')
     setEmail("");
     setPassword("");
     setName('')
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {!approved ? (
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Signup your account
              </h2>
            ) : (
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Please wait for admin approval
              </h2>
            )}
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                  placeholder="Name"
                />
              </div>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                  id="grid-state"
                >
                  {courseDetails.map((course) => {
                    return (
                      <option key={course._id}>{course.coursename}</option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between"></div>

            <div>
              <button
                onClick={handleSubmit}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
            <Link to='/'>Please go to login page</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationForm
