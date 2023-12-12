import { firstBunMock } from "../../assets/mock/mock-bun";

import { firstIngredientMock, secondIngredientMock, thirdIngredientMock } from "../../assets/mock/mock-ingredients";

import ingredientsCounter from "./ingredients-counter";

describe('check counting selected ingredients function', () => {
    it('should count buns', () => {
        expect(ingredientsCounter(firstBunMock, firstBunMock, [])).toBe(2);
    });

    it('should count ingredients', () => {
        expect(
            ingredientsCounter(firstIngredientMock, null, [
                firstIngredientMock,
                secondIngredientMock,
                thirdIngredientMock,
            ])
        ).toBe(1);
    });
});

