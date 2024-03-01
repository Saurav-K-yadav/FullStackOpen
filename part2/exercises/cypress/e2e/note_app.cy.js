beforeEach(function () {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
    name: 'saurav',
    username: 'saurav',
    password: 'saurav'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:5173')
})

describe('Note app', function () {
  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app')
  })

  it('login ', function () {
    cy.contains('login').click()
    cy.get('#username').type('saurav')
    cy.get('#password').type('saurav')
    cy.get('#login-button').click()
    cy.contains('saurav logged-in')
  })

  it('wrong credentials login fails', function () {
    cy.contains('login').click()
    cy.get('#username').type('wrong user')
    cy.get('#password').type('wrong password')
    cy.get('#login-button').click()
    cy.get('.error').contains('Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'saurav logged-in')

  })
})

describe('when logged in', function () {
  beforeEach(function () {
    cy.login({username:'saurav',password:'saurav'})
  })

  it('a new note can be created', function () {
    cy.get('#toggles').click()
    cy.get('#note-input').type('a note created by cypress')
    cy.get('#save').click()
    cy.contains('a note created by cypress')

  })

})

describe('and a note exists', function () {

  beforeEach(function () {
    cy.contains('login').click()
    cy.get('#username').type('saurav')
    cy.get('#password').type('saurav')
    cy.get('#login-button').click()

    cy.get('#toggles').click()
    cy.get('#note-input').type('a note created by cypress')
    cy.get('#save').click()
  })

  it('it can be made not important', function () {
    cy.contains('a note created by cypress')
      .contains('Mark Not Important')
      .click()

    cy.contains('a note created by cypress')
      .contains('Mark Important')
  })
})