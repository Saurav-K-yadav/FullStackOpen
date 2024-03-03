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

  describe('Login', function () {
    it('sucessful login with right credentials', function () {
      cy.get('#username').type('saurav')
      cy.get('#password').type('saurav')
      cy.get('#login').click()
      cy.contains('Sucessfully Logged In')
    })

    it.only('Login fails with wrong credentials', function () {
      cy.get('#username').type('wrong username')
      cy.get('#password').type('wrong password')
      cy.get('#login').click()
      cy.get('html').should('contain', 'Invalid Credentials')
    })
  })

})