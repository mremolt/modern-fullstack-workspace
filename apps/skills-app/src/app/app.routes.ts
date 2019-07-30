export const ROUTES = [
  {
    component: 'skills-home',
    path: '/',
    action() {
      import('./pages/home.element');
    },
  },
  {
    component: 'skills-people-list',
    path: '/people',
    action() {
      import('./pages/people-list.element');
    },
  },
  {
    component: 'skills-person-edit',
    path: '/people/:id/edit',
    action() {
      import('./pages/person-edit.element');
    },
  },
];
