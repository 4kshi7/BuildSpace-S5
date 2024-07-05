import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loading } from "../Loader/Loading";
import { Nav2 } from "../Navbar/Nav2";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}`,
          { withCredentials: true }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}`, {
          withCredentials: true,
        });
        navigate("/posts");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!post) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white ">
      <Nav2/>
      <div className=" p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 text-sm text-gray-400">
            <span>
              {post.User.name} (@{post.User.username})
            </span>
            <span className="float-right">
              {new Date(post.publishedDate).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <img
            src={post.imgUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div
            className="bg-[#062719] rounded-lg p-4 mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex justify-end space-x-4">
            <Link to={`/edit-post/${id}`}>
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
    </div>
  );
};

export default ViewPost;
