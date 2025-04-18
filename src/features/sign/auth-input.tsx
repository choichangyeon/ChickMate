import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: { message?: string };
  type: string;
};

const AuthInput = <T extends FieldValues>({ label, id, register, error, type }: Props<T>) => (
  <div className='flex w-full flex-col px-3 py-2'>
    <label>{label}</label>
    <input {...register(id)} type={type} className='border-b border-gray-300 focus:outline-0' />
    <div className='h-6 text-sm'>{error && <p className='text-primary'>{error.message}</p>}</div>
  </div>
);

export default AuthInput;
