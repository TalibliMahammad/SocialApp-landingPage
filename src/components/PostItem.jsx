import React, { useState, useCallback } from 'react';

const PostItem = ({ post }) => {
  const [like, setLike] = useState(false);

  // Like üçün API request simulyasiyası
  const handleLike = useCallback(async () => {
    setLike(prev => !prev);
    // Burda fetch ilə POST/PATCH sorğusu göndərilə bilər
  }, []);

  return (
    <div className="border-b border-gray-200 pb-6 mb-4">
      <div className="flex items-center gap-3 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt="avatar" />
        </div>
        <span className="font-semibold text-sm">user_{post.userId}</span>
      </div>

      <div className="rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
         <img 
            src={`https://picsum.photos/seed/${post.id}/500/500`} 
            alt="post" 
            className="w-full object-cover" 
         />
      </div>

      <div className="flex gap-4 py-3 text-2xl">
        <button onClick={handleLike} className="transition active:scale-125">
          {like ? "❤️" : "🤍"}
        </button>
        <button className="hover:opacity-50 transition">💬</button>
      </div>

      <div className="px-1">
        <p className="text-sm font-semibold">{like ? 1 : 0} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold mr-2">user_{post.userId}</span>
          {post.body}
        </p>
      </div>
    </div>
  );
};

export default React.memo(PostItem); // React.memo ilə lazımsız renderləri önləyirik