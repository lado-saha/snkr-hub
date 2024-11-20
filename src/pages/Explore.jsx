import React, { useState } from "react";
import Card from "../components/Card";
import { data } from "../assets/data";
import SearchBar from "../components/Searchbar";

const Explore = () => {
  const sneakers = data.sneakers;

  // Filter and prepare items
  const filteredItems = sneakers.filter(
    (s) => s.retail_price_cents !== null && s.story_html !== null
  );

  const items = filteredItems.map((item) => ({ ...item, qty: 1 }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust this to change items displayed per page
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Items for the current page
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };
  // const sneakers = data.sneakers;
  const categories = ["All", "Sneakers", "Clothing", "Accessories"]; // Example categories

  const [setFilteredItems] = useState(sneakers);

  // Handle search by category and product name
  const handleSearch = (category, productName) => {
    let filtered = sneakers;

    if (category && category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (productName) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(productName.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="p-10">
      {/* Search Bar */}
      <SearchBar categories={categories} onSearch={handleSearch} />
      {/* Grid of Items */}
      {/* <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 mx-auto"> */}
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10mx-auto ">
        {currentItems.map((shoe) => (
          <Card key={shoe.id} shoe={shoe} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageSelect(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Explore;
