import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WriteJournal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchJournal = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/journal/${id}`
          );
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error("Error fetching journal:", error);
        }
      };

      fetchJournal();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/v1/journal/${id}`,
          { withCredentials: true },
          { title, content }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/journal",
          { title, content },
          { withCredentials: true }
        );
      }
      navigate("/journals");
    } catch (error) {
      console.error("Error saving journal:", error);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {id ? "Edit Journal" : "Write New Journal"}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Journal Title"
          className="w-full bg-[#062719] rounded-lg p-2 mb-4 text-white"
          required
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="bg-[#062719] rounded-lg mb-4 text-white h-64"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#5AD1B1] text-black font-bold py-2 px-4 rounded-full"
        >
          {id ? "Update Journal" : "Save Journal"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default WriteJournal;
