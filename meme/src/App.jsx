import Navbar from './MEMES/Navbar'
import React, { Profiler } from 'react'
import Home from './MEMES/Home'
import Explore from './MEMES/Explore'
import { Routes,Route } from 'react-router-dom';
import Profile from './MEMES/Profile'
import MemeUpload from './MEMES/Memeupload';
import LikedItems from './MEMES/Likeditems';
import Footer from './MEMES/Footer';
import PageNotFound from './MEMES/Pagenotfound';

const App = () => {
  return (
    <div>
      
      <Navbar/>
      
      
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/Explore' element={<Explore/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/upload' element={<MemeUpload/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
      

    </div>
  )
}

export default App;