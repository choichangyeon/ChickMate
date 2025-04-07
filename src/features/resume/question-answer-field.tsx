import Text from '@/components/ui/text';
import type { Field } from '@/types/resume';

type Props = {
  field: Field;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: (fieldId: string) => void;
};

const QuestionAnswerField = ({ field, onChange, onDelete }: Props) => {
  const { id, question, answer } = field;
  const ANSWER_LENGTH = answer.length;

  return (
    <div className='flex w-[600px] flex-col'>
      <textarea
        id={String(id)}
        name='question'
        value={question}
        onChange={onChange}
        placeholder='질문을 입력해주세요.'
        required
      />
      <textarea
        id={String(id)}
        name='answer'
        value={answer}
        onChange={onChange}
        maxLength={1000}
        placeholder='답변을 입력해주세요.'
        className='h-[300px]'
      />
      <div className='flex justify-between'>
        <Text>{ANSWER_LENGTH} / 1000 (공백 포함)</Text>
        <button type='button' onClick={() => onDelete(id)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswerField;
