describe('Test login', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('userData');
    cy.visit('/');
    
  });

  it('Load login', () => {
    cy.get('#guest-spinner');
    cy.contains('Correo electrónico');
    cy.contains('Contraseña');
    cy.contains('.btn', 'Ingresa');
    cy.contains('regístrate');
    cy.contains('Aún no tienes cuenta?');
    cy.get('#email');
    cy.get('#password');
  });

  it('Go to register', () => {
    cy.contains('a', 'regístrate').click();
    cy.url().should('include', '/register');
  });

  it('State disabled button and link', () => {
    cy.get('.btn').as('loginButton');
    cy.contains('a', 'regístrate').as('registerLink');
    cy.get('#email').type('fakeEmail@gmail.com');
    cy.get('#password').type('123456');
    cy.get('@loginButton').click();
    cy.get('@registerLink').should('have.class', 'todo__disabled');
    cy.get('@loginButton').should('be.disabled');
    cy.get('@loginButton').should(($button) => {
      expect($button).to.not.have.text('Ingresa');
    }); 
    cy.wait(3000);
    cy.get('@registerLink').should('not.have.class', 'todo__disabled');
    cy.get('@loginButton').should('not.be.disabled');
    cy.get('@loginButton').should(($button) => {
      expect($button).to.have.text('Ingresa');
    });
  });

  it('Client validation form input', () => {
    cy.get('.btn').as('loginButton');
    cy.get('@loginButton').click();
    cy.contains('Ingrese correo electrónico');
    cy.contains('Ingrese contraseña');
    cy.get('#email').type('wilson');
    cy.contains('Ingrese correo electrónico válido');

  });

  it('Send bad crendentials', () => {
    cy.reload();
    cy.get('#email').type('wilmer@gmail.com');
    cy.get('#password').type('123');
    cy.get('.btn').click();
    cy.wait(4000);
    cy.get('.alert');
  });

  it('Send correct credentials', () => {
    cy.reload();

    cy.get('@userData').then((userData) => {
      cy.get('#email').type(userData.email);
      cy.get('#password').type(userData.password);
      cy.get('.btn').click();
      cy.wait(4000);
      cy.url().should('include', '/home');
      cy.contains('.todo-header__name', `${userData.firstName} ${userData.lastName}`).click();
      cy.contains('Cerrar sesión').click();
      cy.url().should('include', '/');
    });
  });
});
