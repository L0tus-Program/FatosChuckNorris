describe('Chuck Norris Fact', () => {
    it('should display a Chuck Norris fact', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Loading...').should('exist');
        cy.contains('Loading...').should('not.exist');
        cy.get('p').should('exist');
    });
});
