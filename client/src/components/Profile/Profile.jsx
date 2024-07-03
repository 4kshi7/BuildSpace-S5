import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav2 } from "../Navbar/Nav2";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    img: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Fetch user data from the backend
    // This is a placeholder. Replace with actual API call.
    setUser({
      name: "John Doe",
      username: "johndoe",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    try {
      // Call the update API endpoint
      // This is a placeholder. Replace with actual API call.
      // const response = await fetch('/api/user/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedUser),
      // });
      // const data = await response.json();
      // if (data.message === "User updated successfully") {
      setUser(editedUser);
      setIsEditing(false);
      // }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white">
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
            {isEditing ? (
              <input
                type="text"
                name="img"
                value={editedUser.img}
                onChange={handleChange}
                className="bg-[#0b4334] text-white px-4 py-2 rounded-full w-full max-w-xs text-center"
                placeholder="Image URL"
              />
            ) : null}
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
    </div>
  );
};

export default Profile;
