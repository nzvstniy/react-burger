import { useState } from 'react';

interface IFormData {
  [key: string]: string;
}

export default function useFormData() {
  const [data, setData] = useState<IFormData | null>(null);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return { data, setData, handleData };
}