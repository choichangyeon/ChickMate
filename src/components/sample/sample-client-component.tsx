'use client';
import useSampleStore from '@/store/sample-store';
import { useEffect } from 'react';

type Props = {
  id: string;
};

const ClientComponent = ({ id }: Props) => {
  const { sample } = useSampleStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/sample/${id}`);
      const data = await res.json();
    };

    fetchData();
  }, []);

  return <div>{id}</div>;
};

export default ClientComponent;
