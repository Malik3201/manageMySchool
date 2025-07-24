const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const base = "px-5 py-2.5 rounded-md font-medium transition-all duration-200 shadow-md";

  const variants = {
    primary: "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800",
    success: "text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled ? disabledStyles : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
