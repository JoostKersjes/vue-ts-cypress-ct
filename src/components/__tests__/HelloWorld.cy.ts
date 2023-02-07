import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    cy.mount(HelloWorld, { props: { msg: 'Hello Cypress' } })
    //                     ^ ts(2322)
    cy.get('h1').should('contain', 'Hello Cypress')
  })
})
