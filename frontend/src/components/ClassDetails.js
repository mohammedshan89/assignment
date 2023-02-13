import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ClassDetails = () => {
  const [classDetails, setClassDetails] = useState([]);
  const navigate = useNavigate();
  async function getAllDetails() {
    try {
      const classes = await axios.get("/api/class");

      setClassDetails(classes.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllDetails();
  }, []);

  const handleEdit = async (_id) => {
    navigate("/admin/edit-class", { state: _id });
  };
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/class/${_id}`);
      getAllDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "ClassName",

      selector: (row) => row.classname,
    },
    {
      name: "CourseName",
      selector: (row) => row.coursename,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },

    {
      name: "Edit",
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => {
                handleEdit(row._id);
              }}
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
              onClick={() => {
                handleDelete(row._id);
              }}
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
          navigate("/admin/add-class");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full "
      >
        AddClass
      </button>
      <div className="mx-auto ">
        <DataTable
          title="All Classes"
          columns={columns}
          data={classDetails}
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

export default ClassDetails;
