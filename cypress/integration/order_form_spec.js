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

  it('should be not able to submit the form without a name', () => {
    cy.get('button[name="beans"]').click()
    cy.get('button[name="lettuce"]').click()
    cy.get('button[name="submit"]').click()
    cy.contains('Make sure your order has a name and at least one ingredient')
    cy.get('ul').should('not.contain', 'lettuce')
  })

  it('should be not able to submit the form without one ingredient', () => {
    cy.get('input').type('Josh')
    cy.get('button[name="submit"]').click()
    cy.contains('Make sure your order has a name and at least one ingredient')
    cy.get('ul').should('not.contain', 'lettuce')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="lettuce"]').click()
    cy.intercept('POST','http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'joshOrder.json'
    })
    cy.get('button[name="submit"]').click()
    cy.get('ul').contains('lettuce')
  })

  it('should see an error if the post fails (404)', () => {
    cy.get('input').type('Josh')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="lettuce"]').click()
    cy.intercept('POST','http://localhost:3001/api/v1/orders', {
      statusCode: 404,
      fixture: 'joshOrder.json'
    })
    cy.get('button[name="submit"]').click()
    cy.contains('404: Resource not found')
    cy.get('.order').should('not.exist')
  })

  it('should see an error if the post fails (500)', () => {
    cy.get('input').type('Josh')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="lettuce"]').click()
    cy.intercept('POST','http://localhost:3001/api/v1/orders', {
      statusCode: 500,
      fixture: 'joshOrder.json'
    })
    cy.get('button[name="submit"]').click()
    cy.contains('500')
    cy.get('.order').should('not.exist')
  })

  it('should see an error if the post fails (other)', () => {
    cy.get('input').type('Josh')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="lettuce"]').click()
    cy.intercept('POST','http://localhost:3001/api/v1/orders', {
      statusCode: 422,
      fixture: 'joshOrder.json'
    })
    cy.get('button[name="submit"]').click()
    cy.contains('Something went wrong')
    cy.get('.order').should('not.exist')
  })

})