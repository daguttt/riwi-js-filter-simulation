import { LoginPageComponent } from './pages/public/login/login.page';
import { RegisterPageComponent } from './pages/public/register/register.page';
import { NotFoundPageComponent } from './pages/public/not-found/not-found.page';

import { DashboardPageComponent } from './pages/private/dashboard/dashboard.page';
import { EditProductPageComponent } from './pages/private/edit-product/edit-product.page';

export const routes = {
  public: [
    { path: '/login', component: LoginPageComponent },
    { path: '/register', component: RegisterPageComponent },
    { path: '/not-found', component: NotFoundPageComponent },
  ],
  private: [
    { path: '/dashboard/products', component: DashboardPageComponent },
    { path: '/dashboard/products/edit', component: EditProductPageComponent },
  ],
};
