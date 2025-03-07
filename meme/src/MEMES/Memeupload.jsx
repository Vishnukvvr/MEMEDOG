import React, { useState } from "react";
import UploadItems from "./Uploaditems";
import "../css/Upload.css";

const MemeUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [aiCaption, setAiCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedMemes, setUploadedMemes] = useState([]);
  
  const IMGBB_API_KEY = "04ac9b6041ab585ca247f576a7461b13";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.includes("image") || file.type.includes("gif"))) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image or gif file.");
    }
  };

  const generateAiCaption = async () => {
    try {
      const response = await fetch("https://meme-api.com/generate-caption"); // Replace with actual API
      const data = await response.json();
      setAiCaption(data.caption || "AI-generated meme caption!");
    } catch (error) {
      console.error("Error generating AI caption:", error);
      setAiCaption("Failed to generate AI caption.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload a meme first.");
      return;
    }
    setUploading(true);
    
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        console.log("Meme Uploaded:", data.data.url);
        alert("Meme uploaded successfully! URL: " + data.data.url);
        

        const newMeme = { url: data.data.url, caption: caption || aiCaption };
        const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
        storedMemes.push(newMeme);
        localStorage.setItem("uploadedMemes", JSON.stringify(storedMemes));

        setUploadedMemes([...storedMemes]);
        

        setImage(null);
        setCaption("");
        setAiCaption("");
        setPreview(null);
      } else {
        alert("Failed to upload meme.");
      }
    } catch (error) {
      console.error("Error uploading meme:", error);
      alert("Error uploading meme. Try again.");
    }
    
    setUploading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Your Meme 🙋‍♂️</h2>
      <input type="file" accept="image/*,gif/*" onChange={handleImageUpload} className="mb-2" />
      {preview && <img src={preview} alt="Meme Preview" className="w-full rounded mb-2" />}
      <textarea
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <button onClick={generateAiCaption} className="bg-green-500 text-white px-4 py-1 rounded mr-2">
        Generate AI Caption
      </button>
      {aiCaption && <p className="mt-2 text-gray-600">AI Caption: {aiCaption}</p>}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>
    
    </div>
  );
};

export default MemeUpload;