import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Home.css";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("trending");
  const [sortBy, setSortBy] = useState("likes");
  const [page, setPage] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  const fetchMemes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.memegen.link/images?category=${category}&page=${page}`);
      const data = await response.json();
      let filteredMemes = data;

      if (search) {
        filteredMemes = filteredMemes.filter((meme) => meme.name.toLowerCase().includes(search.toLowerCase()));
      }

      if (sortBy === "likes") {
        filteredMemes.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      } else if (sortBy === "date") {
        filteredMemes.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      }

      if (page === 1) {
        setMemes(filteredMemes.slice(0, 10));
      } else {
        setMemes((prevMemes) => [...prevMemes, ...filteredMemes.slice(0, 10)]);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  }, [category, page, search, sortBy]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="home-container" data-aos="fade-up">
      <h1 className="title-1">Explore Memes 😁</h1>

      <div className="filters">
        <input type="text" placeholder="Search..." value={search} onChange={handleSearch} />
        <select onChange={handleCategoryChange} value={category}>
          <option value="trending">Trending</option>
          <option value="new">New</option>
          <option value="classic">Classic</option>
          <option value="random">Random</option>
        </select>
        <select onChange={handleSortChange} value={sortBy}>
          <option value="likes">Sort by Likes</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <div className="meme-flex">
        {memes.map((meme, index) => (
          <MemeCard key={index} meme={meme} />
        ))}
      </div>

      {loading && <p className="loading">Loading memes...</p>}

      {!loading && memes.length > 0 && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

const MemeCard = ({ meme }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = meme.url;
    link.download = "meme.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="meme-card" data-aos="zoom-in">
      <img src={meme.url} alt={meme.name} className="meme-image" data-aos="flip-left" />
      <p className="meme-title">{meme.name}</p>
      <p className="meme-likes">👍 {meme.likes || Math.floor(Math.random() * 1000)}</p>
      <p className="meme-comments">💬 {meme.comments || Math.floor(Math.random() * 500)}</p>
      <button className="download-btn-1" onClick={handleDownload}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>

      </button>
    </div>
  );
};

export default Explore;
