
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

  it('should see a message if no order yet', () => {
    cy.get('p').contains('Order: Nothing selected')
  })

  it('should see past orders', () => {
    cy.get('.order').contains('Kayla')
    cy.get('ul').contains('beans')
    cy.get('.order').contains('Scott')
    cy.get('ul').contains('pico de gallo')
    cy.get('.order').contains('Claire')
    cy.get('ul').contains('carnitas')
  })

  it('should see a message if the fetch fails (404)', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 404,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')
    cy.contains('404: Resource not found')
    cy.get('.order').should('not.exist')
  })

    it('should see a message if the fetch fails (500)', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 500,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')
    cy.contains('500: Sorry our server is down')
    cy.get('.order').should('not.exist')
  })

})