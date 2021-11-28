import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import Surveys from './pages/Surveys.vue';
import Edit from './pages/Edit.vue';
import Run from './pages/Run.vue';
import Results from './pages/Results.vue';
import Profile from './pages/Profile.vue';

const routes = [
  { path: '/', component: Home, meta: { title: 'VueJS SurveyApp' } },
  { path: '/surveys', component: Surveys, meta: { title: 'Dashboard', authRequired: true } },
  { path: '/surveys/run/:id', component: Run, meta: { title: 'View Survey' } },
  { path: '/surveys/edit/:id', component: Edit, meta: { title: 'Edit Survey', authRequired: true } },
  { path: '/surveys/results/:id', component: Results, meta: { title: 'Results Survey', authRequired: true } },
  { path: '/profile', component: Profile, meta: { title: 'Profile', authRequired: true } },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound, meta: { title: 'Not Found' } },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to) => {
  document.title = to.meta.title;
  let logged = document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false;

  if(to.meta.authRequired && !logged)
    return { path: '/' };
  else if(to.path == '/' && logged)
    return { path: '/surveys' };
});

export { router };