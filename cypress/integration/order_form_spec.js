describe('Order form', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')
  })

  it('should be able to type in the name input', () => {
    cy.get('input').type('Josh')
    cy.get('input').should('have.value', 'Josh')
  })

})