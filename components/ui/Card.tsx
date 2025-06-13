import React from "react";

type CardProps = {
  title?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
};

const Card = ({ title, content, children }: CardProps) => (
  <div className="p-4 rounded shadow bg-white">
    {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
    <div>{content || children}</div>
  </div>
);

export default Card;




