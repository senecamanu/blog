import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    // User sign up
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('./views/SignUp.vue'),
    },

    // User sign in
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('./views/SignIn.vue'),
    },

    // New article
    {
      path: '/new',
      name: 'NewArticle',
      component: () => import('./views/NewArticle.vue'),
    },

    // User profile page
    {
      path: '/:userId',
      name: 'UserProfile',
      component: () => import('./views/UserProfile.vue'),
      children: [
        {
          path: ':articleId',
          name: 'UserArticleDetail',
          component: () => import('./views/UserArticleDetail.vue'),
          children: [
            {
              path: ':edit',
              name: 'UserArticleEdit',
              component: () => import('./views/NewArticle.vue'),
            },
          ],
        },
      ],
    },
  ],
});
