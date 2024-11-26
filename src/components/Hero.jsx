import { useState } from "react";
import { shoes, statistics } from "../constants";
import { bigShoe1 } from "../assets/images";
import { arrowRight } from "../assets/icons";
import Button from "./Button";
import ShoeCard from "./ShoeCard";
import { Link } from "react-router-dom";

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container m-16 bg-inherit"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red dark:text-white">
          The Latest Tools Collection
        </p>

        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="dark:xl:text-white xl:text-gray-800 xl:whitespace-nowrap relative z-10 pr-10">
            The New Arrival
          </span>
          <br />
          <span className="dark:text-white text-coral-red/90 inline-block mt-3">
            Power Tools & Hand Tools{" "}
          </span>
        </h1>
        <p className="font-montserrat text-slate-gray dark:text-gray-300 text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Explore our selection of premium power tools, hand tools, and hardware
          for your next DIY project.
        </p>

        <Button label="Shop now" iconURL={arrowRight}>
          <Link to="/explore">Browse Tools</Link>
        </Button>

        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-palanquin font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="leading-7 font-montserrat text-slate-gray dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center dark:bg-primary-dark">
        <img
          src={bigShoeImg}
          alt="product collection"
          width={610}
          height={502}
          className="object-contain relative z-10"
        />

        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
          {shoes.map((image, index) => (
            <div key={index}>
              <ShoeCard
                index={index}
                imgURL={image}
                changeBigShoeImage={(product) => setBigShoeImg(product)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
