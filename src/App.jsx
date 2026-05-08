import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import Feed from './components/Feed';
import CreatePostModal from './components/CreatePostModal';

function App() {
  // Səhifə boş başlamalıdır (Tapşırıq tələbi)
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("light"); // Light/dark mode üçün state  

  // PERFORMANCE: useCallback ilə funksiyaları sabit saxlayırıq.
  // Bu, Navbar və Modalın hər dəfə lüzumsuz render olunmasının qarşısını alır.

  

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // PERFORMANCE: useMemo ilə postları id-yə görə sıralayırıq.
  // Bu, yalnız 'posts' massivi dəyişəndə hesablanır.
  const memoizedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.id - a.id);
  }, [posts]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar-a onOpen prop-unu düzgün ötürürük */}
      <Navbar onOpen={handleOpenModal} />

      <div className="max-w-[1200px] mx-auto flex justify-center gap-8 pt-24 px-4">
        {/* Sol Sidebar */}
        <div className="hidden lg:block w-[240px] sticky top-24 h-fit">
          <Sidebar mode={mode} setMode={setMode} />
        </div>

        {/* Mərkəzi Post Sahəsi */}
        <main className="w-full max-w-[470px]">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 p-10 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 bg-white">
              <span className="text-5xl mb-4">📸</span>
              <p className="font-semibold text-lg text-gray-600">Hələ heç bir post yoxdur</p>
              <p className="text-sm text-center">
                Paylaşım etmək üçün yuxarıdakı + düyməsinə klikləyin.
              </p>
            </div>
          ) : (
            <Feed posts={memoizedPosts} />
          )}
        </main>

        {/* Sağ Rightbar */}
        <div className="hidden md:block w-[320px] sticky top-24 h-fit">
          <Rightbar />
        </div>
      </div>

      {/* MODAL KOMPONENTİ - Bütün propları dəqiq ötürürük */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        setPosts={setPosts} 
      />
    </div>
  );
}

export default App;