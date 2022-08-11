import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomeView from '@/views/Welcome.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeView,
    },
    // {
    //   path: '/ai-inspect',
    //   name: 'AiInspect',
    //   component: () => import('@/views/ai-inspect/index.vue'),
    // },
    // {
    //   path: '/ai-sampling',
    //   name: 'AiSampling',
    //   component: () => import('@/views/ai-sampling/index.vue'),
    // },
  ],
});

export default router;
