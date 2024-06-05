export function DashboardPageComponent() {
  const user = JSON.parse(localStorage.getItem('user'));

  const $root = document.getElementById('root');
  $root.innerHTML = /*html*/ `
    <h1>Todos los productos</h1>
    <p>Hola ${user.name}</p>
  `;
}
