export function NotFoundPageComponent() {
  const $root = document.getElementById('root');
  $root.innerHTML = /*html*/ `
    <h1>error 404 <h1>
  `;
  console.log('Mostrando Not Found');
}
