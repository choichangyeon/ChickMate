import { useState } from 'react';

/**
 *
 * @initialState 는 초기화 시 사용되는 객체입니다.
 */
const initialState = {
  sampleState: '',
};

export const useSample = () => {
  const [state, setState] = useState(initialState);

  const setSample = (changeValue: any) => {
    setState(changeValue);
  };

  return {
    state,
    setSample,
  };
};
