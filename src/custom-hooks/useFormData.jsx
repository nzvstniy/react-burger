import { useState } from 'react';

export default function useFormData() {
  const [data, setData] = useState({});

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return { data, setData, handleData };
}