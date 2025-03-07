import React from "react";
import { useLikedMemes } from "./Profile";
import "../css/Profile.css";

const LikedItems = () => {
  const context = useLikedMemes();

  if (!context) {
    console.error("useLikedMemes must be used within a LikedMemesContext.Provider");
    return <p>Error loading liked memes. Please try again.</p>;
  }

  const { likedMemes, setLikedMemes } = context;

  console.log("Liked memes in LikedItems:", likedMemes); 

  const handleRemove = (id) => {
    const updatedMemes = likedMemes.filter((meme) => meme.id !== id);
    setLikedMemes(updatedMemes);
    localStorage.setItem("likedMemes", JSON.stringify(updatedMemes));
  };

  return (
    <div className="liked-items-container">
      <h2>Liked Memes ❤️</h2>
      {likedMemes.length === 0 ? (
        <p>No liked memes yet.</p>
      ) : (
        <div className="meme-grid">
          {likedMemes.map((meme) => (
            <div key={meme.id} className="meme-card">
              <img src={meme.url} alt={meme.name} className="meme-image" />
              <p>{meme.name}</p>
              <button className="remove-btn" onClick={() => handleRemove(meme.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedItems;
