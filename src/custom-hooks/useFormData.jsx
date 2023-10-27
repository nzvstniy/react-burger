import { useState } from 'react';

export default function useFormData() {
  const [data, setData] = useState({});

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  console.log(data)
  return { data, setData, handleData };
}