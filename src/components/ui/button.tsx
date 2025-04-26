'use client';
import { buttonStyle } from '@/styles/button-styles';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fixed';
  square?: boolean;
  fontWeight?: 'normal' | 'medium' | 'bold' | 'black';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: ButtonProps) => {
  const {
    children,
    type = 'button',
    onClick = null,
    disabled,
    size = 'medium',
    square = false,
    fontWeight = 'medium',
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    event.currentTarget.blur();
    onClick(event);
  };

  return (
    <button
      type={type}
      className={buttonStyle({ size, square, disabled, fontWeight })}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
