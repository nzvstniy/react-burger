import React, { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/app-header';
import api from '../../utils/api';
import OrderConstructor from '../OrderConstructor/order-constructor';


function App() {
  const [ingredient, setIngredient] = useState([]);

  
  useEffect(() => {
    function fetchApi() {
      return fetch(api.ingredient)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Status ${res.status}`);
        })
        .then((result) => {
          setIngredient(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchApi()
  }, []);



  return (
    <>
    <AppHeader />
    <OrderConstructor data={ingredient}/>
    </>
  );
}


export default App;
