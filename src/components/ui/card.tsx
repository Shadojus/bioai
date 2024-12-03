// src/components/ui/card.tsx

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  return (
    <div
      className={`rounded-lg shadow-md bg-white p-4 dark:bg-gray-800 ${className}`}
    >
      {title && <CardHeader>{title}</CardHeader>}
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="border-b pb-2 mb-4 text-xl font-bold">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
