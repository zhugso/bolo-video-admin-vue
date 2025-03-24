import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import { useTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'video-manage/videos',
          name: 'videoList',
          component: () => import('../views/VideoListView.vue'),
        },
        {
          path: 'video-manage/check',
          name: 'videoCheck',
          component: () => import('../views/CheckVideoView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('../views/PersonView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore()
  if (to.name !== 'login' && !tokenStore.getToken) next({ name: 'login' })
  else next()
})

export default router
