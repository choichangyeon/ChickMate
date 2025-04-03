import { UseFormRegister } from 'react-hook-form';
import { FormData } from './sign-up/data/schema';

type Props = {
  label: string;
  id: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: { message?: string };
  type: string;
};

const AuthInput = ({ label, id, register, error, type }: Props) => (
  <div className='flex w-full flex-col px-3 py-2'>
    <label>{label}</label>
    <input {...register(id)} type={type} className='border-b border-gray-300' />
    <div className='h-6 text-sm'>{error && <p className='text-primary'>{error.message}</p>}</div>
  </div>
);

export default AuthInput;
