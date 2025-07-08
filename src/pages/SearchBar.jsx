import React from "react";
import { FaSearch } from "react-icons/fa";


const SearchBar = ({ placeholder = "Search...", value, onChange }) => (
  <div className="relative w-full">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-4 rounded-xl shadow-xl bg-[#FFFFFF]"
    />
    <FaSearch className="absolute top-5 right-3 text-gray-400" />
  </div>
);

export default SearchBar;