import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  const cardClassName = 'w-full h-full bg-white shadow-md rounded-lg p-4';

  return <div className={clsx(cardClassName, className)}>{children}</div>;
};

export default Card;
