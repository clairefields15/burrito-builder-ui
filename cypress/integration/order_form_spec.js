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

  it('should be able to select ingredients and see them appear on the screen', () => {
    cy.get('button[name="beans"]').click()
    cy.get('p').contains('Order: beans')
    cy.get('button[name="lettuce"]').click()
    cy.get('p').contains('Order: beans, lettuce')
  })

    it('should only be able to click an ingredient button twice', () => {
    cy.get('button[name="beans"]').click()
    cy.get('p').contains('Order: beans')
    cy.get('button[name="beans"]').click()
    cy.get('p').contains('Order: beans, beans')
    cy.get('button[name="beans"]').should('be.disabled')

  })


})