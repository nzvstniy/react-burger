import { firstBunMock, secondBunMock } from "../../../assets/mock/mock-bun";

import { firstIngredientMock, secondIngredientMock, thirdIngredientMock } from "../../../assets/mock/mock-ingredients";

import { keyMock } from "../../../assets/mock/mock-bun";

import reducer, { initialState, ADD_INGREDIENT, CHANGE_POSITION, ADD_BUN, REMOVE_INGREDIENT, RESET } from "./select-ingredient-slice";

describe('check the burger constructor', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, RESET())).toEqual(initialState);
    });

    it('should set a bun', () => {
        const data = { ingredient: firstBunMock, key: `${keyMock}1` };

        expect(reducer(initialState, ADD_BUN(data))).toEqual({
            ...initialState,
            bun: firstBunMock,
        });
    });

    it('should change the bun', () => {
        const state = { bun: firstBunMock, ingredients: [] };
        const data = { ingredient: secondBunMock, key: `${keyMock}2` };

        expect(reducer(state, ADD_BUN(data))).toEqual({
            ...initialState,
            bun: secondBunMock,
        });
    });

    it('should add an ingredient', () => {
        const data = { ingredient: firstIngredientMock, key: `${keyMock}1` };

        expect(reducer(initialState, ADD_INGREDIENT(data))).toEqual({
            ...initialState,
            ingredients: [firstIngredientMock],
        });
    });

    it('should change positions of two ingredients', () => {
        const state = {
            bun: firstBunMock,
            ingredients: [firstIngredientMock, secondIngredientMock, thirdIngredientMock],
        };

        expect(
            reducer(
                state,
                CHANGE_POSITION({ dragIndex: 0, hoverIndex: 2 })
            )
        ).toEqual({
            ...state,
            ingredients: [thirdIngredientMock, secondIngredientMock, firstIngredientMock],
        });
    });

    it('should remove an ingredient', () => {
        const state = {
            bun: firstBunMock,
            ingredients: [firstIngredientMock, secondIngredientMock, thirdIngredientMock],
        };

        expect(reducer(state, REMOVE_INGREDIENT(secondIngredientMock))).toEqual({
            ...state,
            ingredients: [firstIngredientMock, thirdIngredientMock],
        });
    });

    it('should clear the constructor', () => {
        const state = {
            bun: firstBunMock,
            ingredients: [firstIngredientMock, secondIngredientMock, thirdIngredientMock],
        };

        expect(reducer(state, RESET())).toEqual(initialState);
    });
});