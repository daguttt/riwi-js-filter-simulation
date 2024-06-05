import { LoginPageComponent } from './pages/public/login/login.page';
import { RegisterPageComponent } from './pages/public/register/register.page';
import { NotFoundPageComponent } from './pages/public/not-found/not-found.page';

import { DashboardPageComponent } from './pages/private/dashboard/dashboard.page';

export const routes = {
  public: [
    { path: '/login', component: LoginPageComponent },
    { path: '/register', component: RegisterPageComponent },
    { path: '/not-found', component: NotFoundPageComponent },
  ],
  private: [
    { path: '/dashboard/products', component: DashboardPageComponent },
    {
      path: '/dashboard/products/edit',
      component: function (searchParams) {
        const productId = searchParams.get('id');
        const $root = document.getElementById('root');
        $root.innerHTML = /* html */ `
          <h3>Editando producto</h3>
          <div id="product"></div>
        `;
        const logic = async () => {
          const $product = document.getElementById('product');
          const response = await fetch(
            `http://localhost:4000/products/${productId}`
          );
          const product = await response.json();
          $product.innerHTML = /*html*/ `
            <h1>${product.name}</h1>
          `;
        };
        logic();
      },
    },
  ],
};
