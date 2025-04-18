import Trash from '@/components/icons/trash';
import Typography from '@/components/ui/typography';
import type { Field } from '@/types/resume';

type Props = {
  field: Field;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onDelete: (fieldId: string) => void;
};

const QuestionAnswerField = ({ field, onChange, onDelete }: Props) => {
  const { id, question, answer } = field;
  const MAX_ANSWER_LENGTH = 1000;

  return (
    <div className='flex h-[444px] w-full flex-col gap-4 rounded-lg border border-cool-gray-200 p-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex w-full justify-between'>
          <Typography weight='normal' color='primary-600'>
            질문 1
          </Typography>
          <button type='button' onClick={() => onDelete(id)} className='flex gap-5'>
            <span className='font-semibold text-cool-gray-500'>질문 삭제</span> <Trash />
          </button>
        </div>
        <input
          id={String(id)}
          name='question'
          value={question}
          onChange={onChange}
          placeholder='질문을 입력하세요.'
          required
          className='resize-none text-xl font-normal text-cool-gray-900 scrollbar-hide focus:outline-none'
        />
      </div>
      <hr className='border-cool-gray-500' />
      <textarea
        id={String(id)}
        name='answer'
        value={answer}
        onChange={onChange}
        maxLength={MAX_ANSWER_LENGTH}
        placeholder='답변을 입력하세요.'
        required
        className='h-full resize-none font-normal text-cool-gray-900 placeholder-cool-gray-300 scrollbar-hide focus:outline-none'
      />
      <div className='flex justify-end'>
        <Typography color='gray-500'>
          {answer.length}/{MAX_ANSWER_LENGTH}
        </Typography>
      </div>
    </div>
  );
};

export default QuestionAnswerField;
