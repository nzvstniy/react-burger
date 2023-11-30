import { RefObject } from 'react';

export interface IIngredient {
    name: string;
    type: 'bun' | 'main' | 'sauce';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IIngredientId extends IIngredient {
    _id: string;
}

export interface IIngredientKey extends IIngredientId {
    key: string;
}
export interface IIngredientsTab{
    type: string;
    globalType: string;
    ref: RefObject<HTMLDivElement>;
}
export type TIngredientsDetails = {
    [id: string]: {
      name: string;
      number: number;
      price: number;
      image: string;
    };
  };
  