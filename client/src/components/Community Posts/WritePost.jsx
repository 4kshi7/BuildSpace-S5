import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Nav2 } from "../Navbar/Nav2";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/post/${id}`
          );
          setTitle(response.data.title);
          setContent(response.data.content);
          setImgUrl(response.data.imgUrl);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/v1/post/${id}`,
          { title, content, imgUrl },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/post",
          { title, content, imgUrl },
          { withCredentials: true }
        );
      }
      navigate("/posts");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white ">
      <Nav2 />
      <div className=" p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {id ? "Edit Post" : "Write New Post"}
        </h1>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full bg-[#062719] rounded-lg p-2 mb-4 text-white"
            required
          />
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full bg-[#062719] rounded-lg p-2 mb-4 text-white"
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
            {id ? "Update Post" : "Publish Post"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default WritePost;
