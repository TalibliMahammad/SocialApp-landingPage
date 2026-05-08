const Feed = ({ posts }) => {
 return (
  <div className="flex flex-col gap-6">
    {posts.map((post) => (
      <div key={post.id} className="border-b border-gray-200 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
              <div className="bg-white rounded-full p-[1px]">
                <img
                  src={`https://i.pravatar.cc/150?u=${post.id}`}
                  className="rounded-full"
                  alt="avatar"
                />
              </div>
            </div>
            <span className="font-semibold text-sm">mahammad_talibli</span>
            <span className="text-gray-400 text-sm">• 1h</span>
          </div>
          <button className="font-bold tracking-widest text-lg">...</button>
        </div>

        {/* Post Image - YENİLƏNMİŞ HİSSƏ */}
        <div className="rounded border border-gray-200 overflow-hidden bg-gray-50">
          {post.image ? (
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full object-cover max-h-[585px]" 
              // Şəklin ölçüsünü qorumaq üçün object-cover vacibdir
            />
          ) : (
            // Əgər şəkil yoxdursa, boş qalmaması üçün placeholder
            <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400 italic">
              No image attached
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 py-3 text-2xl">
          <button className="hover:opacity-50 transition">❤️</button>
          <button className="hover:opacity-50 transition">💬</button>
          <button className="hover:opacity-50 transition">✈️</button>
        </div>

        {/* Content */}
        <div className="px-1">
          <p className="text-sm font-semibold mb-1">1,234 likes</p>
          <p className="text-sm">
            <span className="font-semibold mr-2">mahammad_talibli</span>
            {post.body}
          </p>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide cursor-pointer">
            View all 12 comments
          </p>
        </div>
      </div>
    ))}
  </div>
);
};

export default Feed;
