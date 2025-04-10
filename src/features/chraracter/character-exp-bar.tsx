import clsx from 'clsx';
import React from 'react';

type Props = {
  percent: number;
  type: 'main' | 'header';
};

const CharacterExpBar = ({ percent, type }: Props) => {
  const height = type === 'header' ? 'h-1' : 'h-2';
  const rounded = type === 'header' ? 'rounded' : 'rounded-md';
  const width = `w-[${percent}%]`;

  return (
    <div className={clsx('w-full overflow-hidden bg-gray-300', height, rounded)}>
      <div className={clsx('bg-green-500 transition-all duration-300', height, rounded, width)} />
    </div>
  );
};

export default CharacterExpBar;
