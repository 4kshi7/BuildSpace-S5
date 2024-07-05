import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loading } from "../Loader/Loading";
import { Nav2 } from "../Navbar/Nav2";
import ReactQuill from "react-quill";

const ViewJournal = () => {
  const [journal, setJournal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/journal/${id}`,
          { withCredentials: true }
        );
        setJournal(response.data);
      } catch (error) {
        console.error("Error fetching journal:", error);
      }
    };

    fetchJournal();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/journal/${id}`, {
          withCredentials: true,
        });
        navigate("/journals");
      } catch (error) {
        console.error("Error deleting journal:", error);
      }
    }
  };

  if (!journal) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white ">
      <Nav2 />
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <div className="mb-4 text-sm text-gray-400">
          <span>
            {journal.User.name} (@{journal.User.username})
          </span>
          <span className="float-right">
            {new Date(journal.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{journal.title}</h1>
        <div className="bg-[#062719] rounded-lg p-4 mb-4" >
        <ReactQuill
              value={journal.content}
              readOnly={true}
              theme={"bubble"}
              className="quill"
            />
        </div>
        <div className="flex justify-end space-x-4">
          <Link to={`/edit-journal/${id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5AD1B1] text-black font-bold py-2 px-4 rounded-full"
            >
              Edit
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ViewJournal;
