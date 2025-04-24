'use client';

import EyeIcon from '@/components/icons/eye-icon';
import EyeOffIcon from '@/components/icons/eye-off-icon';
import Typography from '@/components/ui/typography';
import { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: { message?: string };
  type: string;
  placeholder?: string;
};

const AuthInput = <T extends FieldValues>({ label, id, register, error, type, placeholder }: Props<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = id === 'password' || id === 'passwordCheck';

  const toggleVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className='flex w-full flex-col gap-1'>
      <Typography as='h2' weight='bold' size='sm'>
        {label}
      </Typography>
      <div className='relative'>
        <input
          {...register(id)}
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full border-b border-cool-gray-300 pr-8 placeholder-cool-gray-300 focus:outline-0'
        />
        {isPassword && (
          <button type='button' onClick={toggleVisibility} className='absolute right-0 top-1/2 -translate-y-1/2'>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <Typography size='xs' color='primary-600'>
          {error.message}
        </Typography>
      )}
    </div>
  );
};

export default AuthInput;
