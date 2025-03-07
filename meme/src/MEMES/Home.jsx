import React, { useEffect, useState, createContext, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Home.css";
import LikedItems from "./Likeditems";

const LikedMemesContext = createContext();

export const useLikedMemes = () => useContext(LikedMemesContext);

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedMemes, setLikedMemes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setMemes(data.data.memes.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching memes:", error));

    
    const storedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedMemes);
  }, []);

  return (
    <LikedMemesContext.Provider value={{ likedMemes, setLikedMemes }}>
      <div className="home-container" data-aos="fade-up">
        <h1 className="title">Trending Memes ☠️</h1>

        {loading ? (
          <p className="loading">Loading memes...</p>
        ) : (
          <div className="meme-flex">
            {memes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        )}
      </div>
    </LikedMemesContext.Provider>
  );
};

const MemeCard = ({ meme }) => {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { likedMemes, setLikedMemes } = useLikedMemes();

  const handleLike = () => {
    setLikes(likes + 1);

    let storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];

    if (!storedLikes.find((m) => m.id === meme.id)) {
      storedLikes.push(meme);
      localStorage.setItem("likedMemes", JSON.stringify(storedLikes));
      setLikedMemes([...likedMemes, meme]);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleDownload = async () => {
    const response = await fetch(meme.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${meme.name}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="meme-card" data-aos="zoom-in">
      <img src={meme.url} alt={meme.name} className="meme-image" />
      <div className="sub-meme">
        <div>
          <p className="meme-title">{meme.name}</p>
        </div>

        <div className="buttons">
          <button className="like-btn" onClick={handleLike}>
            ❤️ <br /> {likes}
          </button>
          <button className="download-btn" onClick={handleDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>
          </button>
        </div>
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="comment-btn">➤</button>
        </form>
        <div className="comments">
          {comments.map((cmt, index) => (
            <p key={index} className="comment">{cmt}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
