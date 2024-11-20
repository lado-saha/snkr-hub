import Button from "./Button";

const Subscribe = () => {
  return (
    <section
      id="contact-us"
      className="max-container flex justify-center items-center max-lg:flex-col gap-10 py-10"
    >
      <div className="text-center lg:text-left">
        <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Sign Up for
          <span className="text-coral-red"> Updates </span>& Newsletter
        </h3>
        <p className="text-lg lg:max-w-md text-gray-600 dark:text-gray-300 mt-4">
          Stay up-to-date with our latest news and promotions. Never miss an
          update!
        </p>
      </div>

      <div className="lg:max-w-[500px] w-full flex items-center max-sm:flex-col gap-3 p-4 rounded-xl shadow-md">
        <input
          type="email"
          placeholder="subscribe@nike.com"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral-red dark:bg-gray-700 dark:text-white transition-all"
        />
        {/* <div className="flex justify-center "> */}
        <Button
          label="Sign Up"
          backgroundColor="bg-coral-red"
          textColor="text-white"
          borderColor="border-coral-red"
          fullWidth={true} // Set true for full width
        />
      </div>
      {/* </div> */}
    </section>
  );
};

export default Subscribe;
