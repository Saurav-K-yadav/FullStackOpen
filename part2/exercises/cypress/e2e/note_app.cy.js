beforeEach(function () {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  const user = {
    name: 'saurav',
    username: 'saurav',
    password: 'saurav'
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  cy.visit('')
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
    cy.login({ username: 'saurav', password: 'saurav' })
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
    cy.login({ username: "saurav", password: "saurav" }) 
    cy.createNote({
      content: 'a note created by cypress',
      important:true
    })
  })

  it('it can be made not important', function () {
    cy.contains('a note created by cypress')
      .contains('Mark Not Important')
      .click()

    cy.contains('a note created by cypress')
      .contains('Mark Important')
  })
})

describe.only('and several notes exist', function () {
  beforeEach(function () {
    cy.login({ username: 'saurav', password: 'saurav' })
    cy.createNote({ content: 'first note', important: false })
    cy.createNote({ content: 'second note', important: false })
    cy.createNote({ content: 'third note', important: false })
  })

  it('one of those can be made important', function () {
    cy.contains('second note').parent().find('button').as('theButton')
    cy.get('@theButton').click()
    cy.get('@theButton').should('contain', 'Mark Not Important')
    // cy.contains('second note').parent().find('button').contains('Mark Not Important')
  })

  it('then example', function () {
    cy.get('button').then(buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

})