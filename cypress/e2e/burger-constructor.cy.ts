import { cyEmail, cyPassword } from "./../../src/assets/mock/mock-user-data"

describe('creating an order in the burger constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
            fixture: 'ingredients.json',
        }).as('ingredients');
        cy.visit('http://localhost:3000/');
        cy.wait('@ingredients');
    });
    context('open/close ingredients modal', () => {
        it('should open and close modal', () => {
            cy.getByData('bun').within(() => {
                cy.getByData('content').children().eq(0).as('card');

                cy.get('@card')
                    .should('contain', 'Краторная булка N-200i')
                    .and('contain', '1255')
                    .find('img')
                    .should(
                        'have.attr',
                        'src',
                        'https://code.s3.yandex.net/react/code/bun-02.png'
                    );

                cy.get('@card').click();
            });

            cy.location('pathname').should(
                'equal',
                '/ingredients/643d69a5c3f7b9001cfa093c'
            );

            cy.getByData('ingredient-details')
                .should('exist')
                .should('contain', 'Краторная булка N-200i')
                .and('contain', '80')
                .and('contain', '24')
                .and('contain', '53')
                .and('contain', '420');

            cy.getByData('close-button').click();
            cy.location('href').should('equal', 'http://localhost:3000/');
        });

    });
    context('check dnd with order', () => {
        it('should drag items', () => {
            cy.getByData('order').as('dropArea')
            cy.get("a").contains("Личный кабинет").click();
            cy.get("input").first().type(cyEmail);
            cy.get("input").last().type(cyPassword);
            cy.get("button").contains("Войти").click();
            cy.location('href').should('equal', 'http://localhost:3000/profile');
            cy.get("a").contains("Конструктор").click();
            cy.getByData('content').children().eq(0).drag('@dropArea')
            cy.getByData('content').children().eq(3).drag('@dropArea')
            cy.getByData('orderBtn').click();
            cy.wait(17000);
            cy.getByData('close-button').click();


        })

       
    })
});


