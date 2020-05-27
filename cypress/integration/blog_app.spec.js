describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'sangita1',
            username: 'sangita',
            password: '12345678'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()
    })


    describe('Login', function () {
        it('succeeds with correct credentials', function () {

            cy.get('#username').type('sangita')
            cy.get('#password').type('12345678')
            cy.get('#login-button').click()

            cy.contains('ssangita logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#logout-button').click()
            cy.get('#username').type('san')
            cy.get('#password').type('45678')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
        })
    })



    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('sangita')
            cy.get('#password').type('12345678')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('new Blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create').click()
            cy.contains('A new blog test blog by test author added')
        })

        it('A blog can be liked', function () {
            cy.contains('new Blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })

        it('A blog can be deleted', function () {
            cy.contains('new Blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create').click()
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.should('not.contain', 'test blog')
        })
    })

})


describe.only('Sort likes', function () {
    beforeEach(function () {
        cy.get('#username').type('sangita')
        cy.get('#password').type('12345678')
        cy.get('#login-button').click()
        cy.contains('new Blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#create').click()
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('new Blog').click()
        cy.get('#title').type('test blog1')
        cy.get('#author').type('test author1')
        cy.get('#url').type('test url1')
        cy.get('#create').click()
    })

    it('Blogs sorted by likes', function () {
        cy.get('p')
            .then((blogs) => {
                cy.wrap(blogs[1]).should('have.text', 'test blog ')
            })



    })
})

