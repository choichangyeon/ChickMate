import { useState, useEffect } from 'react';

/**
 * 디바운스 함수
 * 지덩한 시간(delay) 동안 값이 변경되지 않으면 마지막 값을 반영합니다.
 * 입력값이 자주 변경될 때 성능 최적화를 위해 사용됩니다.
 *
 * @param value 디바운싱 처리할 값
 * @param {Number} delay 디바운스 딜레이 시간(ms)
 * @returns debouncedValue delay 이후 확정된 값
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
