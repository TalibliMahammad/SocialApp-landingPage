import React from "react";

const Navbar = ({ onOpen }) => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-16 flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter italic">
          Instagram.az
        </h1>

        <input
          type="text"
          placeholder="Search"
          className="hidden sm:block bg-gray-100 rounded-lg px-4 py-2 w-64 outline-none focus:ring-1 ring-gray-300"
        />

        <div className="flex items-center gap-6 text-2xl">
          <button onClick={onOpen} className="hover:scale-110 transition">
            ➕
          </button>
          <button className="hover:scale-110 transition">🔔</button>
          <img
            src="https://i.pravatar.cc/150?u=my"
            className="w-7 h-7 rounded-full border border-gray-200"
            alt="me"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
