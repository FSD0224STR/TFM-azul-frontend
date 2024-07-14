describe('Registro de Usuario', () => {
    beforeEach(() => {
      cy.visit('/registration');
    });
  
    it('Debe mostrar el formulario de registro', () => {
      cy.get('form[name="register"]').should('be.visible');
    });
  
    it('Debe mostrar errores de validación al enviar el formulario vacío', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.ant-form-item-explain-error').should('have.length', 5);
    });
  
    it('Debe mostrar error cuando el correo no es válido', () => {
      cy.get('input[name="email"]').type('correo-no-valido');
      cy.get('button[type="submit"]').click();
      cy.get('.ant-form-item-explain-error')
        .contains('El correo electrónico no es válido')
        .should('be.visible');
    });
  
    it('Debe mostrar error cuando la contraseña no cumple con los requisitos', () => {
      cy.get('input[name="password"]').type('contraseña');
      cy.get('button[type="submit"]').click();
      cy.get('.ant-form-item-explain-error')
        .contains('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&_-)')
        .should('be.visible');
    });
  
    it('Debe registrar al usuario correctamente', () => {
      cy.intercept('POST', '/ruta-a-tu-api-de-registro', {
        statusCode: 200,
        body: { data: 'Usuario registrado correctamente' },
      }).as('registerUser');
  
      cy.get('input[name="username"]').type('nuevoUsuario');
      cy.get('input[name="firstname"]').type('Nombre');
      cy.get('input[name="lastname"]').type('Apellido');
      cy.get('input[name="email"]').type('usuario@example.com');
      cy.get('input[name="password"]').type('Contraseña1@');
  
      cy.get('button[type="submit"]').click();
      cy.wait('@registerUser');
      cy.get('.ant-modal-content').contains('Registro exitoso').should('be.visible');
    });
  
    it('Debe mostrar un error cuando el registro falla', () => {
      cy.intercept('POST', '/ruta-a-tu-api-de-registro', {
        statusCode: 400,
        body: { error: 'Error en el registro' },
      }).as('registerUserFailed');
  
      cy.get('input[name="username"]').type('nuevoUsuario');
      cy.get('input[name="firstname"]').type('Nombre');
      cy.get('input[name="lastname"]').type('Apellido');
      cy.get('input[name="email"]').type('usuario@example.com');
      cy.get('input[name="password"]').type('Contraseña1@');
  
      cy.get('button[type="submit"]').click();
      cy.wait('@registerUserFailed');
      cy.get('.ant-alert-error').contains('Error en el registro').should('be.visible');
    });
  });