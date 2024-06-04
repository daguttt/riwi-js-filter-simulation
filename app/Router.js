import { routes } from './routes';

function navigateTo(targetPath) {
  window.history.pushState({}, '', targetPath); // Ej: -> '/login'
  Router();
}

export function Router() {
  // 1. Obtener la ruta actual de la barra de direcciones del navegador.
  const currentPath = window.location.pathname;
  // console.log({ path });
  // 2. Obtener la ruta descrita en `routes` que se empareje con la ruta actual
  const publicRoute = routes.public.find((r) => r.path === currentPath);
  const privatRoute = routes.private.find((r) => r.path === currentPath);
  // 3. Validar si la ruta actual existe en las rutas descritas
  if (publicRoute) {
    // 4. Ejecutar el componente asociado a la ruta.
    publicRoute.component();
  } else if (privatRoute) {
    privatRoute.component();
  } else {
    console.error('No se encontró la ruta');
    // Redirigir al /not-found
    navigateTo('/not-found');
  }
}
