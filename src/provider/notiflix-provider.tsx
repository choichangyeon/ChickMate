'use client';

import { useEffect } from 'react';
import { initNotiflix } from '@/styles/notiflix-styles';

const NotiflixProvider = () => {
  useEffect(() => {
    initNotiflix();
  }, []);

  return null;
};

export default NotiflixProvider;
