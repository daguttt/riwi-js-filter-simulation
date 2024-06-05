import { logOut } from '../helpers/log-out';
export function PrivateLayout(contentHtml, contentLogic) {
  const $root = document.getElementById('root');
  $root.innerHTML = /*html*/ `
    <header>
      <nav>
        <ul>
          <li><button>Productos</button></li>
          <li><button>Pedidos</button></li>
        </ul>
      </nav>
      <button id="log-out-btn">Cerrar sesión</button>
    </header>
    <div>${contentHtml}</div>
  `;
  contentLogic();

  // Logica del button log out
  const $buttonLogOut = document.getElementById('log-out-btn');
  $buttonLogOut.addEventListener('click', () => {
    logOut();
  });
}
