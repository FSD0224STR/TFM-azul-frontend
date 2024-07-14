Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: '/api/login', // Ajusta la URL a tu endpoint de inicio de sesión
      body: {
        email,
        password,
      },
    }).then((resp) => {
      window.localStorage.setItem('token', resp.body.token);
    });
  });
  
  // Configuración global antes de cada test
  beforeEach(() => {
    // Puedes poner cualquier configuración o inicialización aquí.
    // Ejemplo: Borrar cookies y local storage antes de cada test.
    cy.clearCookies();
    cy.clearLocalStorage();
  });