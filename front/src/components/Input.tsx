import React from "react";
import cnMerge from "./../utils/cnMerge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        className={cnMerge(
          "block w-full px-4 py-2 text-gray-900 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none",
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
