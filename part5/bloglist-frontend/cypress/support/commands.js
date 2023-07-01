// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('create_user', (user) => {
  //cy.request('POST', 'http://localhost:3003/api/users', user)
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('create_blog', ({ title, author, url, likes = 0 }) => {
  const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/blogs`,
    body: { title, author, url, likes },
    auth: { bearer: `${user.token}` }
  })
})
