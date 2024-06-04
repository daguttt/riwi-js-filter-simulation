import { emailValidator } from '../../../helpers/email-validator';

export function RegisterPageComponent() {
  const $root = document.getElementById('root');
  $root.innerHTML = /*html*/ `
    <main>
      <div class="form-container">
        <h1>Registro</h1>
        <form id="form-register">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </main>
  `;

  // -*********************************************************-
  // Logica del Registro
  const $formRegister = document.getElementById('form-register');
  const $nameInput = document.getElementById('name');
  const $emailInput = document.getElementById('email');
  const $passwordInput = document.getElementById('password');

  $formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validar el correo
    const isValidEmail = emailValidator($emailInput.value);
    if (!isValidEmail) {
      alert('Email no válido. Corrígelo.');
      return;
    }

    const userToRegister = {
      name: $nameInput.value,
      email: $emailInput.value,
      password: $passwordInput.value,
      // NOTA: Por defecto solo se registran visitantes
      roleId: '2', // -> Visitor
    };
    console.log({ userToRegister });
  });
}
