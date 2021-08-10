
describe('App view', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')
  })

  it('should see the title when you visit', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should see an order form with options', () => {
    cy.get('form').should('be.visible')
    cy.get('input').should('be.visible')
    cy.get('form').find('button').contains('beans')
    cy.get('form').find('button').contains('steak')
    cy.get('form').find('button').contains('carnitas')
    cy.get('form').find('button').contains('sofritas')
    cy.get('form').find('button').contains('lettuce')
    cy.get('form').find('button').contains('queso fresco')
    cy.get('form').find('button').contains('pico de gallo')
    cy.get('form').find('button').contains('hot sauce')
    cy.get('form').find('button').contains('guacamole')
    cy.get('form').find('button').contains('jalapenos')
    cy.get('form').find('button').contains('cilantro')
    cy.get('form').find('button').contains('sour cream')
    cy.get('form').find('button').contains('Submit Order')

  })

})