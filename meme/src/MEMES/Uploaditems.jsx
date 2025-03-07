import React, { useState, useEffect } from "react";
import "../css/Upload.css";

const UploadItems = ({ uploadedMemes }) => {
  const [memes, setMemes] = useState(uploadedMemes || []);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setMemes(storedMemes);
  }, [uploadedMemes]);

  return (
    <div className="uploaded-items-container">
      <h2 className="text-lg font-semibold mt-4">Uploaded Memes 📤</h2>
      {memes.length === 0 ? (
        <p>No memes uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {memes.map((meme, index) => (
            <div key={index} className="meme-card">
              <img src={meme.url} alt={`Uploaded Meme ${index + 1}`} className="w-full rounded" />
              <p className="text-sm text-gray-600 mt-1">{meme.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadItems;