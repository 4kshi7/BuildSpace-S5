import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPlainTextFromHTML } from "../Journals/AllJournals";
import { Loading } from "../Loader/Loading";
import { Nav2 } from "../Navbar/Nav2";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/bulk`,
          { withCredentials: true }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white ">
      <Nav2 />
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Community Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <motion.div
          className="fixed bottom-8 right-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/write-post"
            className="bg-[#5AD1B1] text-black font-bold py-2 px-4 rounded-full"
          >
            New Post
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#062719] rounded-lg p-4 shadow-lg"
    >
      <Link to={`/post/${post.id}`}>
        <div className="mb-2 text-sm text-gray-400 flex justify-between">
          <div>
            
            <span className="font-semibold text-white mr-1">{post.User.name}</span> @{post.User.username}
            {post.User.role === 'admin' && (
              <span className="bg-red-600 text-white text-xs font-bold mr-2 px-2 py-1 rounded ml-2">
                ADMIN
              </span>
            )}
          </div>
          <span className="float-right">
            {new Date(post.publishedDate).toLocaleDateString()}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="mb-2">
          <img
            src={post.imgUrl}
            alt={post.title}
            className="w-full h-40 object-cover rounded"
          />
        </div>
        <p className="text-sm text-gray-300 line-clamp-3">
          {getPlainTextFromHTML(post.content)}
        </p>
      </Link>
    </motion.div>
  );
};

export default AllPosts;
