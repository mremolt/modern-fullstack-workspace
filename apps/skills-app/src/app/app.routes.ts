export const ROUTES = [
  {
    component: 'skills-home',
    path: '/',
    action() {
      import('./elements/home.element');
    },
  },
  {
    component: 'skills-users',
    path: '/users',
    action() {
      import('./elements/users.element');
    },
  },
];
