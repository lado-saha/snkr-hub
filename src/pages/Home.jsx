import React from "react";
import Hero from "../components/Hero";
const Home = () => {
  return (
    <div>
      <div className="relative flex flex-col gap-y-4 lg:flex-row  items-center justify-center w-full min-h-screen ">
        <div className="flex flex-col ">
          <Hero />
          {/* <h1 className="text-[150px] md:text-[200px] md:tracking-normal lg:text-[250px] text-slate-300 dark:text-slate-50 font-bold lg:tracking-wide lg:leading-4 lg:shadow-md md:hover:text-slate-400">
            AIR MAX
          </h1>
          <img
            src="./hero-img.png"
            alt="img"
            width={700}
            height={700}
            className="absolute w-[500px] h-[500px] object-cover md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] top-[10%] left-[5%] md:left-[30%] hover:translate-y-4 transition-all ease-in-out duration-1000"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
