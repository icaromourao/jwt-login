import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgendaView.vue'),
  },
  {
    path: '/cadastros',
    name: 'registrations',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrationsView.vue'),
  },
  {
    path: '/financeiro',
    name: 'finance',
    component: () => import(/* webpackChunkName: "about" */ '../views/FinanceView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.getIsLogged) {
    next({ name: 'login' });
  } else if (to.name === 'login' && store.getters.getIsLogged) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
