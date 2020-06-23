import 'cypress-localstorage-commands';

describe('Test home', () => {
  before(() => {
    cy.fixture('user.json').as('userData');
    cy.get('@userData').then((userData) => {
      cy.visit('/');
      cy.get('#email').type(userData.email);
      cy.get('#password').type(userData.password);
      cy.contains('.btn', 'Ingresa').click();
      cy.wait(6000);
      cy.saveLocalStorage();
    });
  });

  beforeEach(() => {
    cy.fixture('user.json').as('userData');
    cy.restoreLocalStorage();
  });

  it('Init home', () => {
    cy.get('@userData').then((userData) => {
      cy.get('.todo-header__avatar').as('header');
      cy.contains('Cerrar sesión').as('logoutMessage');
      cy.get('@logoutMessage').should('not.be.visible');
      cy.contains('.todo-header__name', `${userData.firstName} ${userData.lastName}`).click();
      cy.get('@logoutMessage').should('be.visible');
      cy.get('header').click();
      cy.get('@logoutMessage').should('not.be.visible');
      cy.wait(3000);
      cy.contains('h1', 'Tareas');
      cy.get('.todo-home__input');
      cy.contains('.btn', 'Agregar');
      cy.contains('Aún no has agregado tareas');
    });
    
  });

  it('Add Task', () => {
    cy.get('.todo-home__input').as('inputTask');
    cy.contains('.btn', 'Agregar').as('btnAdd');
    cy.get('@inputTask').type('Nueva tarea');
    cy.get('@btnAdd').click();
    cy.get('@btnAdd').should('be.disabled');
    cy.get('@inputTask').should('be.disabled');
    cy.wait(3000);
    cy.get('@btnAdd').should('not.be.disabled');
    cy.get('@inputTask').should('not.be.disabled');
    cy.get('@inputTask').should('have.value', '');
    cy.contains('Aún no has agregado tareas').should('not.exist');
    cy.get('.todo-home__task-item');
  });

  it('Check task', () => {
    cy.get('.todo-home__task-item-name').as('taskName');
    cy.get('.todo-home__task-item-overlay').as('overlay');
    cy.get('[type="checkbox"]').as('checkboxTask');
    cy.get('@checkboxTask').click();
    cy.get('@overlay').should('have.class', 'todo-home__task-item-overlay--active');
    cy.wait(3000);
    cy.get('@taskName').should('have.class', 'todo-home__task-item-name--completed');
    cy.get('@overlay').should('not.have.class', 'todo-home__task-item-overlay--active');
  });

  it('Uncheck task', () => {
    cy.get('.todo-home__task-item-name').as('taskName');
    cy.get('.todo-home__task-item-overlay').as('overlay');
    cy.get('[type="checkbox"]').as('checkboxTask');
    cy.get('@checkboxTask').click();
    cy.get('@overlay').should('have.class', 'todo-home__task-item-overlay--active');
    cy.wait(3000);
    cy.get('@taskName').should('not.have.class', 'todo-home__task-item-name--completed');
    cy.get('@overlay').should('not.have.class', 'todo-home__task-item-overlay--active');
  });

  it('Show user list', () => {
    cy.get('.todo__dropdown-content').as('userList');
    cy.get('@userList').should('not.be.visible');
    cy.get('.todo-home__task-item-avatar').click();
    cy.get('@userList').should('be.visible');
    cy.get('.todo-home__task-item-avatar').click();
    cy.get('@userList').should('not.be.visible');
    cy.get('.todo-home__task-item-avatar').click();
    cy.get('@userList').should('be.visible');
    cy.get('.todo-home__task-item-name').click();
    cy.get('@userList').should('not.be.visible');
  });

  it('Change user', () => {
    cy.get('.todo__dropdown-content').as('userList');
    cy.get('.todo-home__task-item-overlay').as('overlay');
    cy.get('.todo-home__task-item-avatar').click();
    cy.get('@userList').should('be.visible');
    cy.contains('.todo-home__task-dropdown-email', 'ronald@gmail.com').click();
    cy.get('@overlay').should('have.class', 'todo-home__task-item-overlay--active');
    cy.wait(3000);
    cy.get('@overlay').should('not.have.class', 'todo-home__task-item-overlay--active');
    cy.get('@userList').should('not.be.visible');
    cy.contains('.todo-home__task-item-email', 'ronald@gmail.com');
  });

  it('Delete task', () => {
    cy.get('.todo-home__task-item-delete').click();
    cy.get('.todo-home__task-item-overlay').should('have.class', 'todo-home__task-item-overlay--active');
    cy.wait(3000);
    cy.contains('Aún no has agregado tareas');
  });

  it('Logout', () => {
    cy.get('@userData').then((userData) => {
      cy.contains('.todo-header__name', `${userData.firstName} ${userData.lastName}`).click();
      cy.contains('Cerrar sesión').click();
      cy.url().should('include', '/');
    });
  });
});
