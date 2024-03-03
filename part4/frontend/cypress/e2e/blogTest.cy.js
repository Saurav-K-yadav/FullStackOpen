describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      'name': 'saurav',
      'username': 'saurav',
      'password': 'saurav'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', () => {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')

  })
})