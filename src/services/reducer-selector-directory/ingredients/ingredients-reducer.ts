import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../../utils/api'
import { IIngredient } from './ingredients-types';

interface IGetIngredientsQueryResponse {
  data: IIngredient[];
}

export const ingredientsReducer = createApi({
  reducerPath: 'ingredientsReducer',
  baseQuery: fetchBaseQuery({ baseUrl: API.baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query<IGetIngredientsQueryResponse, void>({
      query: () => API.endpoints.ingredients,
    }),
  }),
});
export const { useGetIngredientsQuery } = ingredientsReducer;