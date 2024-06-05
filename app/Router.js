import { routes } from './routes';

export function navigateTo(targetPath) {
  window.history.pushState({}, '', targetPath); // Ej: -> '/login'
  Router();
}

export function Router() {
  // 1. Obtener la ruta actual de la barra de direcciones del navegador.
  const currentPath = window.location.pathname;
  // 2. Obtener los search params actuales
  const currentSearchParams = new URLSearchParams(window.location.search);
  console.log({ currentPath, currentSearchParams });
  // console.log({ path });
  // 3. Obtener la ruta descrita en `routes` que se empareje con la ruta actual
  const publicRoute = routes.public.find((r) => r.path === currentPath);
  const privatRoute = routes.private.find((r) => r.path === currentPath);
  // 4. Validar si la ruta actual existe en las rutas descritas
  if (publicRoute) {
    // 5. Ejecutar el componente asociado a la ruta pasandole los search params.
    publicRoute.component(currentSearchParams);
  } else if (privatRoute) {
    privatRoute.component(currentSearchParams);
  } else {
    console.error('No se encontró la ruta');
    // Redirigir al /not-found
    navigateTo('/not-found');
  }
}

// Se vuelve a ejecutar el router cuando
// naveguemos hacia atrás o hacia adelante con
// los botones <- o -> del navegador (ubicados
// en la parte superior izquierda de la ventana).
window.onpopstate = Router;
