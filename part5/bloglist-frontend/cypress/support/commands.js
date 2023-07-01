// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('create_blog', ({ title, author, url, likes = 0 }) => {
  const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url, likes },
    auth: { bearer: `${user.token}` }
  })
})
