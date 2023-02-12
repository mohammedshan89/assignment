
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from '../api/axios';


const AdHome = () => {
 const [userDeatils, setUserDetails] = useState([])

 async function getAllDetails(){
  try {
    const users = await axios.get('/api/admin/all-users')
    setUserDetails(users.data)

  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
  getAllDetails()
 },[])

const handleApprove =async (_id) => {
  try{
    const approve = await axios.post('api/admin/approve_user',{_id})
    console.log(approve)
  }catch(error){
    console.log(error)
  }

}



  const columns = [
    {
      name: 'Name',

      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Course',
      selector: (row) => row.course,
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.approval ? (
              
                <button
                  disabled
              
                  className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full "
                >
                  Approved
                </button>

            ) : (
              <button
               onClick={()=>handleApprove(row._id)}
                className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
              >
                Approve
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mx-auto ">

    

        <DataTable
          title="All Users"
          columns={columns}
          data={userDeatils}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
}


export default AdHome
