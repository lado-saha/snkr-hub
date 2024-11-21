import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Card = ({ product }) => {
  const cart = useSelector((state) => state.cart);

  const img =
    "https://image.goat.com/375/attachments/product_template_pictures/images/021/321/847/original/473391_00.png"; // Adapted to Product class
  const price = product.price; // Adapted to Product class
  const desc = product.description; // Adapted to Product class
  const id = product.id; // Adapted to Product class

  const dispatch = useDispatch();
  const add = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const remove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.error("Removed item from cart");
  };

  return (
    <div>
      <div className="w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-slate-50 dark:bg-[#1f1b24] dark:hover:bg-[#121015] dark:text-white dark:outline-none dark:border-none border border-slate-100 outline outline-slate-100  hover:shadow-2xl relative">
        <div className=" flex flex-col gap-6">
          <div>
            <img
              src={img}
              width={200}
              height={200}
              alt={product.name || "product"} // Fallback to "product" if no name
              className="mx-auto"
            />
            <Link to={`/preview/${id}`}>
              <button className="absolute bg-slate-600 dark:bg-slate-800 dark:font-semibold text-white text-xs p-1 top-2 right-2 rounded-md animate-pulse">
                Preview
              </button>
            </Link>
          </div>
          <p className="text font-bold">
            {product.name}
          </p>
          {/* Description */}
          <p className="text-base font-medium max-h-[96px] overflow-y-hidden">
            {desc.split(" ").slice(0, 20).join(" ") + "..."}
          </p>

          <div className="flex  items-center justify-between">
            {cart.some((item) => item.id === product.id) ? (
              <button
                onClick={() => remove(id)}
                className="bg-red-400 text-white p-2 rounded-md text-sm"
              >
                Remove Item
              </button>
            ) : (
              <button
                onClick={add}
                className="bg-black dark:bg-slate-800 dark:hover:bg-black text-white p-2 rounded-md text-sm "
              >
                Add to Cart
              </button>
            )}
            <span className="text-xl font-semibold">
              {Math.ceil((price * 100) / 100) * 100} FCFA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
