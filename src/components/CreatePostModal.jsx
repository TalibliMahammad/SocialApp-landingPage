import React, { useState } from 'react';

const CreatePostModal = ({ isOpen, onClose, setPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Şəkli modal daxilində göstərmək üçün
    }
  };

  const handleShare = async () => {
    try {
      // Tapşırıq tələbi: API Post Request
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'mahammad_talibli',
          body: text,
          userId: 1,
        }),
        headers: { 'Content-type': 'application/json' },
      });

      const data = await response.json();

      // Yeni postu mərkəzi siyahıya əlavə edirik
      setPosts(prev => [{
        ...data,
        id: Date.now(), // Real ID simulyasiyası
        image: preview  // Seçilən şəkli Feed-də göstərmək üçün
      }, ...prev]);

      // Təmizləmə
      setText("");
      setImage(null);
      setPreview("");
      onClose();
    } catch (err) {
      console.error("Post paylaşıla bilmədi:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b text-center font-bold text-gray-700">Yeni post yarat</div>
        
        <div className="p-6">
          {!preview ? (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              <span className="text-4xl mb-2">🖼️</span>
              <span className="text-gray-500 font-medium">Şəkil seçin</span>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          ) : (
            <div className="relative h-64 w-full group">
              <img src={preview} className="w-full h-full object-cover rounded-xl" alt="preview" />
              <button 
                onClick={() => setPreview("")}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full text-xs"
              >
                Dəyiş
              </button>
            </div>
          )}

          <textarea 
            className="w-full mt-6 p-3 bg-gray-50 rounded-xl focus:outline-none min-h-[100px] resize-none"
            placeholder="Açıqlama əlavə et..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl transition">Ləğv et</button>
            <button 
              onClick={handleShare}
              disabled={!preview || !text}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${(!preview || !text) ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;