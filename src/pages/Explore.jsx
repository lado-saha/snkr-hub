import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SearchBar from "../components/Searchbar";
import {
  getAllProducts,
  searchProduct,
  fetchCategories,
  getAllProductsCount,
} from "../api/rest-apis";

const Explore = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const itemsPerPage = 8;
  const [currentProducts, setCurrentProducts] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories([{ id: "All", name: "All" }, ...categoriesData]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesData();
  }, []);

  // Fetch products when page, category, or query changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsData = [];
        if (selectedCategory === "All") {
          productsData = await searchProduct(
            null,
            query,
            itemsPerPage,
            currentPage
          );
          const totalProductCount = await getAllProductsCount();
        
          setTotalPages(Math.ceil(totalProductCount / itemsPerPage));
        } else {
          const categoryId = categories.find(
            (cat) => cat.name === selectedCategory
          )?.id;
          productsData = await searchProduct(
            categoryId,
            query,
            itemsPerPage,
            currentPage
          );
          setTotalPages(Math.ceil(productsData.total / itemsPerPage));
        }
        setCurrentProducts(productsData); // Use API-paginated data directly
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Only fetch products if categories are loaded
    if (categories.length > 0) fetchProducts();
  }, [currentPage, selectedCategory, query, categories]);

  // Handle search bar actions
  const handleSearch = (category, productName) => {
    setQuery(productName);
    setSelectedCategory(category || "All");
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-10">
      {/* Search Bar */}
      <SearchBar categories={categories} onSearch={handleSearch} />

      {/* Grid of Items */}
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 mx-auto">
        {currentProducts.map((product) => (
          <Card key={product.id} product={product} />
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
