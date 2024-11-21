import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import Button from "./Button";
import { fetchProduct } from "../api/rest-apis";

const PreviewCard = ({ id }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike', or null

  const handleLike = () => {
    if (userReaction === "like") {
      // Undo like
      setLikes((prev) => prev * 1 - 1);
      setUserReaction(null);
    } else if (userReaction === "dislike") {
      // Switch from dislike to like
      setDislikes((prev) => prev * 1 - 1);
      setLikes((prev) => prev * 1 + 1);
      setUserReaction("like");
    } else {
      // Add like
      setLikes((prev) => prev * 1 + 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      // Undo dislike
      setDislikes((prev) => prev * 1 - 1);
      setUserReaction(null);
    } else if (userReaction === "like") {
      // Switch from like to dislike
      setLikes((prev) => prev * 1 - 1);
      setDislikes((prev) => prev * 1 + 1);
      setUserReaction("dislike");
    } else {
      // Add dislike
      setDislikes((prev) => prev * 1 + 1);
      setUserReaction("dislike");
    }
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchProduct(id);
        setProduct(categoriesData.product);
        setCategory(categoriesData.categories[0]);
        setLikes(categoriesData.product.likes || 0);
        setDislikes(categoriesData.product.dislikes || 0);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchCategoriesData();
  }, [id]);

  const add = () => {
    if (!product) return;
    const itemInCart = cart.some((item) => item.id === product.id);
    if (itemInCart) {
      toast.error("You've already added this item");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  if (!product) {
    return (
      <div className="grid place-items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid place-items-center min-h-screen bg-gray-50 dark:bg-[#121212] p-8 m-16">
      <section className="bg-white dark:bg-[#1f1b24] dark:hover:bg-[#121015] rounded-xl shadow-xl hover:shadow-2xl w-full max-w-4xl p-6 flex flex-col gap-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            // src={product.imageUrl || "https://via.placeholder.com/350"}
            src={
              "https://github.com/lado-saha/snkr-hub/blob/master/src/assets/images/tool-box.png"
            }
            alt={product.name}
            className="h-[350px] w-[350px] object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="text-gray-500 dark:text-white">
          <div className="text-gray-500 dark:text-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-black dark:text-white capitalize">
                {product.name}
              </h3>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full">
                In Stock
              </span>
            </div>

            <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-gray-900 dark:text-gray-100">Price:</span>
              <span className="text-coral-red">
                {Math.ceil((product.price / 100) * 100)} FCFA
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-400 text-sm font-medium">
                <i className="fas fa-tags"></i> Category:
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {category ? category.name : "No Category"}
              </span>
            </div>

            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Reviews Section */}
          {/* Reviews Section */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Customer Reviews
            </h4>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-coral-red rounded-full text-white flex items-center justify-center font-bold">
                        {review.author[0]}
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {review.author}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {review.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              id="addToCartButton"
              className="bg-[#2a2a2a] hover:bg-black text-white uppercase px-8 py-3 rounded-lg transition"
              onClick={add}
            >
              Add to Cart
            </button>
            <button
              id="likeButton"
              className="bg-[#2a2a2a] hover:bg-black text-white p-3 rounded-lg transition flex items-center"
              onClick={handleLike}
            >
              👍 {likes}
            </button>
            <button
              id="dislikeButton"
              className="bg-[#2a2a2a] hover:bg-black text-white p-3 rounded-lg transition flex items-center"
              onClick={handleDislike}
            >
              👎 {dislikes}
            </button>
          </div>

          {/* Comment Section */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 my-4 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral-red"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            ></textarea>
            <Button
              className="bg-coral-red text-white px-4 py-2 rounded-full m-4"
              onClick={() => {
                if (comment.trim()) {
                  toast.success("Comment added!");
                  setComment("");
                } else {
                  toast.error("Please enter a comment!");
                }
              }}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviewCard;
