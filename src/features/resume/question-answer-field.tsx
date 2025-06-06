import Trash from '@/components/icons/trash';
import Typography from '@/components/ui/typography';
import type { Field } from '@/types/resume';

type Props = {
  field: Field;
  fieldListLen: number;
  idx: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onDelete: (fieldId: string) => void;
};

const MAX_ANSWER_LENGTH = 1000;
const MIN_RESUME_FIELD_COUNT = 1;

const QuestionAnswerField = ({ field, fieldListLen, idx, onChange, onDelete }: Props) => {
  const { id, question, answer } = field;

  return (
    <div className='flex h-[444px] min-h-[444px] w-full flex-col gap-4 rounded-lg border border-cool-gray-200 p-8 tablet:h-[380px] tablet:min-h-[380px] mobile:h-[300px] mobile:min-h-[300px]'>
      <div className='flex flex-col gap-2'>
        <div className='flex w-full justify-between'>
          <Typography weight='normal' color='primary-600'>
            <span className='mobile:text-sm'>질문 {idx + 1}</span>
          </Typography>
          {fieldListLen > MIN_RESUME_FIELD_COUNT && (
            <button type='button' onClick={() => onDelete(id)} aria-label='질문 삭제'>
              <Trash className='mobile:h-4 mobile:w-4' />
            </button>
          )}
        </div>
        <input
          id={`question-${id}`}
          name='question'
          value={question}
          onChange={onChange}
          placeholder='질문을 입력하세요.'
          required
          className='resize-none text-xl font-normal text-cool-gray-900 scrollbar-hide focus:outline-none mobile:text-lg'
        />
      </div>
      <hr className='border-cool-gray-500' />
      <textarea
        id={`answer-${id}`}
        name='answer'
        value={answer}
        onChange={onChange}
        maxLength={MAX_ANSWER_LENGTH}
        placeholder='답변을 입력하세요.'
        required
        className='h-full resize-none font-normal text-cool-gray-900 placeholder-cool-gray-300 scrollbar-hide focus:outline-none mobile:text-sm'
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
