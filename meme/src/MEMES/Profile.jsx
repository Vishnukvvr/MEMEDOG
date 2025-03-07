import React, { useState, useEffect, createContext, useContext } from "react";
import "../css/Profile.css";
import LikedItems from "./Likeditems";
import UploadItems from "./Uploaditems";

const LikedMemesContext = createContext();
export const useLikedMemes = () => useContext(LikedMemesContext);

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Your Name",
    bio: "Bio",
    profilePic: "https://example.com/valid-image-url.jpg",
  });
  const [memes, setMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedMemes);

    const storedUser = JSON.parse(localStorage.getItem("userProfile")) || {
      name: "Your Name",
      bio: "Bio",
      profilePic: "https://example.com/valid-image-url.jpg",
    };
    setUser(storedUser);

    const storedUploads = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(storedUploads);
  }, []);

  const handleEdit = () => setEditing(!editing);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setEditing(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <LikedMemesContext.Provider value={{ likedMemes, setLikedMemes }}>
      <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <label htmlFor="profilePicInput" className="cursor-pointer">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
          </label>
          <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          {editing ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="border-1 p-1 rounded"
            />
          ) : (
            <h2 className="text-xl font-semibold">{user.name}</h2>
          )}
        </div>
        {editing ? (
          <textarea
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="border-1 p-1 w-full mt-2 rounded"
          />
        ) : (
          <p className="text-gray-600 mt-2">{user.bio}</p>
        )}
        <button
          onClick={editing ? handleSave : handleEdit}
          className="mt-3 bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editing ? "Save" : "Edit Profile"}
        </button>

        <LikedItems />
        <UploadItems uploadedMemes={uploadedMemes} />
      </div>
    </LikedMemesContext.Provider>
  );
};

export default UserProfile;
