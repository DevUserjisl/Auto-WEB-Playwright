Feature: Login en la aplicación

  @happy_path
  Scenario: [HAPPY PATH] Login exitoso
    Given que el usuario está en la página de login
    When ingresa sus credenciales válidas
    Then realiza login exitoso

  @unhappy_path
  Scenario: [UNHAPPY PATH] Login fallido con credenciales incorrectas
    Given que el usuario está en la página de login
    When ingresa credenciales incorrectas
    Then muestra un mensaje de error "Credenciales inválidas"
