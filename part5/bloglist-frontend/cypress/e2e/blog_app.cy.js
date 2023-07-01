describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ro Ot',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Ro Ot logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('notpasword')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Ro Ot logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogform-title').type('My Awesome Blog')
      cy.get('#blogform-author').type('Mr Blogperson')
      cy.get('#blogform-url').type('www.testblog.com')
      cy.get('#blogform-submit').click()

      cy.get('.blogEntry').contains('My Awesome Blog Mr Blogperson')
    })

    it('A blog can be liked', function() {
      cy.create_blog({ title: 'My Blog', author: 'Mr Blog', url: 'www.blog.com' })
      // create_blog uses the API to create
      // reload page to see the effect
      cy.reload()

      cy.contains('view').click()
      cy.get('.blogEntry.long').should('contain', 'likes 0')
      cy.get('.likeButton').click()
      cy.get('.blogEntry.long').should('contain', 'likes 1')
    })

    it('A blog can be deleted by its creator', function() {
      cy.create_blog({ title: 'My Blog', author: 'Mr Blog', url: 'www.blog.com' })
      cy.reload()

      cy.contains('view').click()
      cy.get('.deleteButton').click()

      cy.get('.notification')
        .should('contain', 'Deleted My Blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', '.blogEntry.short')
    })
  })
})