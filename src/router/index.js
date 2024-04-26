import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/pages/Home.vue';
import Practice from '@/components/pages/Practice/[id].vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/practice/:id', 
    name: 'Practice', 
    component: Practice
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
