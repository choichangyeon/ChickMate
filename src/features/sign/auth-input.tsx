import Typography from '@/components/ui/typography';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: { message?: string };
  type: string;
};

const AuthInput = <T extends FieldValues>({ label, id, register, error, type }: Props<T>) => (
  <div className='flex w-full flex-col gap-1 px-3 py-2'>
    <Typography weight='bold' as='h2'>
      {label}
    </Typography>
    <input {...register(id)} type={type} className='border-b border-gray-300 focus:outline-0' />
    <div className='h-5'>
      {error && (
        <Typography size='sm' color='primary-600'>
          {error.message}
        </Typography>
      )}
    </div>
  </div>
);

export default AuthInput;
