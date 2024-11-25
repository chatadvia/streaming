import React from "react";
import cnMerge from "./../utils/cnMerge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, className, ...props }) => {
  return (
    <button
      className={cnMerge(
        "px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
