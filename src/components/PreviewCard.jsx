import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import Button from "./Button";

const PreviewCard = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(0);

  const add = () => {
    const shoeInCart = cart.some((item) => item.id === shoe.id);
    if (shoeInCart) {
      toast.error("You've Already Added This Item");
    } else {
      dispatch(addToCart(shoe));
      toast.success("Added to cart");
    }
  };

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const img = shoe.original_picture_url;
  const price = shoe.retail_price_cents;
  const desc = shoe.story_html;
  const name = shoe.name;
  const brand = shoe.brand_name;
  const gender = shoe.gender[0];

  return (
    <div className="grid place-items-center min-h-screen bg-gray-50 dark:bg-[#121212] p-8 m-16">
      <section className="bg-white dark:bg-[#1f1b24] dark:hover:bg-[#121015] rounded-xl shadow-xl hover:shadow-2xl w-full max-w-4xl p-6 flex flex-col gap-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="Shoe"
            className="h-[350px] w-[350px] object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="text-gray-500 dark:text-white">
          <small className="uppercase">
            {gender}'s {brand}
          </small>
          <h3 className="uppercase text-2xl font-semibold mt-2 text-black dark:text-white">
            {name}
          </h3>
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">
            ₹ {price}
          </h3>
          <p className="text-sm mb-6">{desc}</p>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart-fill mr-1"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
              {likes}
            </button>
            <button
              id="dislikeButton"
              className="bg-[#2a2a2a] hover:bg-black text-white p-3 rounded-lg transition flex items-center"
              onClick={handleDislike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heartbreak-fill mr-1"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
              {dislikes}
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
                  toast.success("Comment Added!");
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
