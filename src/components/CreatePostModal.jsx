import React, { useState, useRef } from 'react';

const CreatePostModal = ({ open, handleClose, setPosts }) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Şəkil faylı
  const [preview, setPreview] = useState(null); // Ekranda görünən preview URL
  const fileInputRef = useRef(null);

  // Şəkil seçiləndə işə düşən funksiya
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // Faylı müvəqqəti URL-ə çevirir
    }
  };

  const handleAddPost = async () => {
    if (!title.trim() && !selectedImage) return;

    // Real API-yə göndərmək üçün FormData istifadə olunur (fayl göndərildiyi üçün)
    const formData = new FormData();
    formData.append("title", "Mahammad Talibli");
    formData.append("body", title);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      // POST sorğusu (Nümunə URL)
      // const response = await fetch('https://blog-api-t6u0.onrender.com/posts', {
      //   method: 'POST',
      //   body: formData,
      // });

      // State-i yeniləyirik (Local olaraq dərhal görmək üçün)
      const newPost = { 
        id: Date.now(), 
        title: "Mahammad Talibli", 
        body: title,
        image: preview // Bizim seçdiyimiz şəkil
      };

      setPosts((prev) => [newPost, ...prev]);
      
      // Təmizləmə
      setTitle("");
      setSelectedImage(null);
      setPreview(null);
      handleClose();
    } catch (err) {
      console.error("Post göndərilmədi", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[400px] rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button onClick={handleClose}>✕</button>
          <h2 className="text-base font-semibold">New Post</h2>
          <button onClick={handleAddPost} className="text-blue-500 font-bold">Share</button>
        </div>

        <div className="p-4">
          {/* Şəkil Preview Sahəsi */}
          {preview ? (
            <div className="relative mb-4">
              <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-lg" />
              <button 
                onClick={() => {setPreview(null); setSelectedImage(null);}}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
              >✕</button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-40 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer mb-4 hover:bg-gray-50"
            >
              <span className="text-gray-400">Click to upload photo</span>
            </div>
          )}

          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            className="hidden" 
          />

          <textarea
            className="w-full h-20 outline-none resize-none"
            placeholder="Write a caption..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};


export default CreatePostModal;