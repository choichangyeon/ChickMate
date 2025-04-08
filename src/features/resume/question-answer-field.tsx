import Text from '@/components/ui/text';
import type { Field } from '@/types/resume';

type Props = {
  field: Field;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: (fieldId: string) => void;
};

const QuestionAnswerField = ({ field, onChange, onDelete }: Props) => {
  const { id, question, answer } = field;
  const MAX_ANSWER_LENGTH = 1000;

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
        maxLength={MAX_ANSWER_LENGTH}
        placeholder='1000자 이하의 답변을 입력해주세요.'
        required
        className='h-[300px]'
      />
      <div className='flex justify-between'>
        <Text>{answer.length} / 1000 (공백 포함)</Text>
        <button type='button' onClick={() => onDelete(id)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswerField;
