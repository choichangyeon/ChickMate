'use client';
import LinkButton from '@/components/ui/link-button';
const SARAMIN_URL = 'http://www.saramin.co.kr';
const SaraminButton = () => {
  return (
    <LinkButton href={SARAMIN_URL} target='_blank'>
      데이터 출처: 취업 사람인
    </LinkButton>
  );
};

export default SaraminButton;
