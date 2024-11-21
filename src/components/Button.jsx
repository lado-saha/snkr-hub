const Button = ({ label, iconURL, fullWidth, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
        bg-coral-red text-dark border-coral-red 
        dark:bg-coral-red/90 dark:text-white dark:border-coral-red/80
        rounded-full 
        ${fullWidth ? "w-full" : ""}
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-red dark:focus:ring-coral-red/80`}
    >
      {children || (
        <>
          <p className="dark:fg-white fg-dark">{label}</p>
          {iconURL && (
            <img
              src={iconURL}
              alt="icon"
              className="ml-2 rounded-full bg-white w-5 h-5 dark:bg-gray-800"
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
