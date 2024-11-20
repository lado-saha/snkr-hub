import React, { useState } from "react";

const SearchBar = ({ categories, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle product name change
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  // Handle the search button click
  const handleSearch = () => {
    onSearch(selectedCategory, productName);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 m-4 mt-8 rounded-lg max-w-4xl mx-auto">
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base dark:bg-[#1f1f1f] dark:text-white dark:focus:ring-green-500"
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Product Name Input */}
      <input
        type="text"
        placeholder="Search for a product..."
        value={productName}
        onChange={handleProductNameChange}
        className="p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base w-64 dark:bg-[#1f1f1f] dark:text-white dark:focus:ring-green-500"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
