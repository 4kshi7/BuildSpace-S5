import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav2 } from "../Navbar/Nav2";
import axios from "axios";
import { Loading } from "../Loader/Loading";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    img: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/info`,
        { withCredentials: true }
      );
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/`,
        {
          name: editedUser.name,
          username: editedUser.username,
        },
        { withCredentials: true }
      );
      if (response.data.message === "User updated successfully") {
        setUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (
        error.response &&
        error.response.data.error === "Username already taken"
      ) {
        alert("Username already taken. Please choose a different username.");
      }
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav2 />
          <div className="container mx-auto lg:px-36 md:px-8 px-4 pt-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center items-center mb-12"
            >
              <h1 className="text-[#5AD1B1] font-bold text-4xl sm:text-5xl">
                Profile
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#062719]/20 rounded-xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex flex-col items-center mb-8">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user.img}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[#5AD1B1] text-sm">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="bg-[#0b4334] text-white px-4 py-2 rounded-full w-full"
                    />
                  ) : (
                    <p className="text-lg">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#5AD1B1] text-sm">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                      className="bg-[#0b4334] text-white px-4 py-2 rounded-full w-full"
                    />
                  ) : (
                    <p className="text-lg">{user.username}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#5AD1B1] text-sm">Email</label>
                  <p className="text-lg">{user.email}</p>
                  {isEditing && (
                    <p className="text-sm text-[#5AD1B1] mt-1">
                      To change your email, please contact
                      lotusfocus.life@gmail.com
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 flex justify-center"
              >
                {isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="bg-[#5AD1B1] text-black px-6 py-2 rounded-full font-semibold"
                  >
                    Save Changes
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="bg-[#0b4334] text-white px-6 py-2 rounded-full font-semibold"
                  >
                    Edit Profile
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
