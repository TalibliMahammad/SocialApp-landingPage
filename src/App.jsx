import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Rightbar from './components/Rightbar';
import CreatePostModal from './components/CreatePostModal';
import Feed from './components/Feed';


function App() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Yeni postların həmişə yuxarıda görünməsi üçün sıralama
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.id - a.id);
  }, [posts]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar onOpen={handleOpen} />
      
      <div className="max-w-[1200px] mx-auto flex justify-center gap-8 pt-20 px-4">
        {/* Sol Menyu - Desktopda görünür, sticky (sabit) qalır */}
        <div className="hidden lg:block w-[240px] sticky top-20 h-fit">
          <Sidebar />
        </div>

        {/* Orta Feed - Əsas məzmun */}
        <main className="w-full max-w-[470px] flex-shrink-0">
          <Feed posts={sortedPosts} />
        </main>

        {/* Sağ Panel - Orta ölçülü ekranlardan başlayaraq görünür */}
        <div className="hidden md:block w-[320px] sticky top-20 h-fit">
          <Rightbar />
        </div>
      </div>

      {/* Post yaratma Modalı */}
      <CreatePostModal
        open={open} 
        handleClose={handleClose} 
        setPosts={setPosts} 
      />
    </div>
  );
}

export default App;