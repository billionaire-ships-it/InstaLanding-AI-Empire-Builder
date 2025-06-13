import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
