import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';
import { LayoutComponent } from './layouts/layout.component';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add(
      [
        {
          path: '/member/auth/login',
          name: 'Login',
          iconClass: 'fas fa-home',
          order: 1,
          layout: eLayoutType.empty,
        },
        {
          path: '/member/auth/verifyle',
          name: 'Login21',
          iconClass: 'fas fa-home',
          order: 1,
          layout: eLayoutType.empty,
        },
        {
          path: '/admin/auth/login',
          name: 'Login2',
          iconClass: 'fas fa-home',
          order: 2,
          layout: eLayoutType.empty,
        },
        {
          path: '/admin/auth/register',
          name: 'Register',
          iconClass: 'fas fa-home',
          order: 4,
          layout: eLayoutType.empty,
        },
        {
          path: '/admin/auth/forgetpwd',
          name: 'Forget Password',
          iconClass: 'fas fa-home',
          order: 5,
          layout: eLayoutType.empty,
        },
        {
          path: '/admin/auth/verifyle',
          name: 'Forget Password2',
          iconClass: 'fas fa-home',
          order: 6,
          layout: eLayoutType.empty,
        },

        //------- Router for Member-------
        {
          path: '/',
          name: '::Menu:Home',
          iconClass: 'fas fa-home',
          order: 8,
          layout: eLayoutType.application,
        },
      ].sort((a, b) => a.order - b.order)
    );
  };
}
