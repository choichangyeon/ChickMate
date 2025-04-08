import { useState, useEffect } from 'react';

/**
 * 디바운스 함수
 * 짧은 시간 동안 반복되는 이벤트를 하나로 묶어서 마지막 이벤트만 실행시켜줍니다
 *
 * @param value 디바운싱 처리를 하고 싶은 값
 * @param delay 몇 밀리초(ms) 뒤에 반영할 것인가
 * @returns
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
