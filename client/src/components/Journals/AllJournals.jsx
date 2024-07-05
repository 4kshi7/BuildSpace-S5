import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav2 } from "../Navbar/Nav2";
import { Loading } from "../Loader/Loading";
import ReactQuill from "react-quill";

const AllJournals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/journal/bulk`,
          { withCredentials: true }
        );
        setJournals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white ">
      <Nav2/>
      <motion.div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">My Journals</h1>
        {journals.length === 0 ? (
          <p className="text-center">No journals found. Start writing!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        )}
        <motion.div
          className="fixed bottom-8 right-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/write-journal"
            className="bg-[#5AD1B1] text-black font-bold py-2 px-4 rounded-full"
          >
            New Journal
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const JournalCard = ({ journal }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#062719] rounded-lg p-4 shadow-lg"
    >
      <Link to={`/journal/${journal.id}`}>
        <div className="mb-2 text-sm text-gray-400">
          <span>
            {journal.User.name} (@{journal.User.username})
          </span>
          <span className="float-right">
            {new Date(journal.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{journal.title}</h2>
        <p className="text-sm text-gray-300 line-clamp-3">
          {getPlainTextFromHTML(journal.content)}
        </p>
      </Link>
    </motion.div>
  );
};

export const getPlainTextFromHTML = (html) => {
  return html.replace(
    /<(\w+)\s*[^>]*>|<\/(\w+)\s*>|<(\w+)\s*\/>/gi,
    function (match, p1, p2) {
      if (p2 === p1 && p2 !== "br") {
        return match.startsWith("</") ? " " : "";
      } else {
        return match.startsWith("</") ? " " : p1 === "br" ? "" : "";
      }
    }
  );
};

export default AllJournals;
