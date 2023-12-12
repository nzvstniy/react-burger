import { firstBunMock } from "../../assets/mock/mock-bun";

import { firstIngredientMock, secondIngredientMock, thirdIngredientMock } from "../../assets/mock/mock-ingredients";

import priceCounter from "./price-counter";

describe('check counting total price function', () => {
    const sumBun = priceCounter('bun', firstBunMock);
    const sumIngredients = priceCounter('ingredients', [
        firstIngredientMock,
        secondIngredientMock,
        thirdIngredientMock,
    ]);
  
    it('should check counting only a bun', () => {
      expect(sumBun).toBe(firstBunMock.price * 2); // two buns
    });
  
    it('should check counting only ingredients', () => {
      expect(sumIngredients).toBe(
        firstIngredientMock.price + secondIngredientMock.price + thirdIngredientMock.price
      );
    });
  
    it('should check counting a bun and ingredients', () => {
      expect(sumBun + sumIngredients).toBe(
        firstBunMock.price * 2 +
        firstIngredientMock.price +
        secondIngredientMock.price +
        thirdIngredientMock.price
      );
    });
  });