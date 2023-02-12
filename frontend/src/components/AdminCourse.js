import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

const AdminCourse = () => {
  const [courseDetails, setCourseDetails] = useState([]);
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

  const handleApprove = async (_id) => {
    try {
      const approve = await axios.post("api/admin/approve_user", { _id });
      console.log(approve);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async(_id) => {
    navigate('/admin/edit-course',{state:_id})
  }
  const handleDelete =async(_id) => {
    try {
      await axios.delete(`/api/course/${_id}`)
      getAllDetails()
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: "Course name",

      selector: (row) => row.coursename,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },

    {
      name: "View Users",
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
                onClick={() => handleApprove(row._id)}
                className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
              >
                View Details
              </button>
            )}
          </div>
        );
      },
    },
    {
      name: "Edit",
      selector: (row) => {
        return (
          <div>
            <button
              onClick={()=>{handleEdit(row._id)}}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full "
            >
              Edit
            </button>
          </div>
        );
      },
    },
    {
      name: "Delete",
      selector: (row) => {
        return (
          <div>
            <button
              onClick={()=>{handleDelete(row._id)}}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full "
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <button
        onClick={() => {
          navigate("/admin/add-course");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full "
      >
        AddCourse
      </button>
      <div className="mx-auto ">
        <DataTable
          title="All Course"
          columns={columns}
          data={courseDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default AdminCourse;
